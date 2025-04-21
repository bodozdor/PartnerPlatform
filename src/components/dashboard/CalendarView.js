import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import Card from '../common/Card';

/**
 * CalendarView component
 * @param {Date} selectedDate - Currently selected date
 * @param {function} onDateSelect - Function to call when date is selected
 * @param {array} reservations - Reservations data for highlighting dates
 * @param {string} type - Business type (affects how dates are highlighted)
 */
const CalendarView = ({ 
  selectedDate = new Date(), 
  onDateSelect,
  reservations = [],
  type = 'restaurant'
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  
  useEffect(() => {
    generateCalendar();
    generateWeekDays();
  }, [currentMonth, reservations]);
  
  const generateWeekDays = () => {
    const days = [];
    const dayNames = ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'];
    
    for (let i = 0; i < 7; i++) {
      days.push(dayNames[i]);
    }
    
    setWeekDays(days);
  };
  
  const generateCalendar = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty days for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: 0, date: null });
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const hasReservation = checkReservation(date);
      
      days.push({
        day: i,
        date,
        hasReservation,
      });
    }
    
    setCalendarDays(days);
  };
  
  const checkReservation = (date) => {
    if (!reservations || reservations.length === 0) return false;
    
    // Format to compare dates (ignoring time)
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (type === 'accommodation') {
      // For accommodation, check if date is between check-in and check-out
      return reservations.some(res => {
        if (!res.check_in_date || !res.check_out_date) return false;
        
        const checkInDate = new Date(res.check_in_date);
        const checkOutDate = new Date(res.check_out_date);
        
        checkInDate.setHours(0, 0, 0, 0);
        checkOutDate.setHours(0, 0, 0, 0);
        
        return checkDate >= checkInDate && checkDate < checkOutDate && res.status !== 'canceled';
      });
    } else {
      // For other business types, check if there's a reservation on this date
      return reservations.some(res => {
        if (!res.reservation_date) return false;
        
        const resDate = new Date(res.reservation_date);
        resDate.setHours(0, 0, 0, 0);
        
        return resDate.getTime() === checkDate.getTime() && res.status !== 'canceled';
      });
    }
  };
  
  const previousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  const isSelectedDate = (date) => {
    if (!date) return false;
    
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    
    date.setHours(0, 0, 0, 0);
    
    return date.getTime() === selected.getTime();
  };
  
  const isToday = (date) => {
    if (!date) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    date.setHours(0, 0, 0, 0);
    
    return date.getTime() === today.getTime();
  };
  
  const formatMonthYear = (date) => {
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('hr-HR', options);
  };
  
  const handleDateSelect = (date) => {
    if (!date) return;
    onDateSelect(date);
  };
  
  return (
    <Card>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.arrowButton} 
          onPress={previousMonth}
        >
          <Feather name="chevron-left" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {formatMonthYear(currentMonth)}
        </Text>
        
        <TouchableOpacity 
          style={styles.arrowButton} 
          onPress={nextMonth}
        >
          <Feather name="chevron-right" size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.calendarGrid}>
        {calendarDays.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayContainer,
              item.day === 0 && styles.emptyDay,
              isSelectedDate(item.date) && styles.selectedDay,
              isToday(item.date) && styles.todayContainer
            ]}
            onPress={() => item.date && handleDateSelect(item.date)}
            disabled={item.day === 0}
          >
            {item.day !== 0 && (
              <>
                <Text
                  style={[
                    styles.dayText,
                    isSelectedDate(item.date) && styles.selectedDayText,
                    isToday(item.date) && styles.todayText
                  ]}
                >
                  {item.day}
                </Text>
                
                {item.hasReservation && (
                  <View
                    style={[
                      styles.reservationDot,
                      isSelectedDate(item.date) && styles.selectedReservationDot
                    ]}
                  />
                )}
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  arrowButton: {
    padding: 5,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  weekDayText: {
    fontSize: 12,
    color: COLORS.grey,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%', // 7 days per row
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    position: 'relative',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  todayContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.dark,
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  todayText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  reservationDot: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  selectedReservationDot: {
    backgroundColor: COLORS.white,
  },
});

export default CalendarView;
