import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  SafeAreaView,
  Alert
} from 'react-native';
import { supabase, TABLES } from '../../config/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useBusiness } from '../../hooks/useBusinessProfile';
import { useReservations } from '../../hooks/useReservations';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import StatsCard from '../../components/dashboard/StatsCard';
import ReservationCard from '../../components/dashboard/ReservationCard';
import CalendarView from '../../components/dashboard/CalendarView';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import { Feather } from '@expo/vector-icons';

const BeautyDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  const { reservations, loading, refreshReservations } = useReservations();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingAppointments: 0,
    weeklyAppointments: 0,
    averageRating: 0,
  });

  useEffect(() => {
    loadStats();
  }, [reservations]);

  const loadStats = () => {
    if (!reservations) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Today's appointments
    const todayAppointments = reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      resDate.setHours(0, 0, 0, 0);
      return resDate.getTime() === today.getTime() && res.status !== 'canceled';
    }).length;
    
    // Pending appointments
    const pendingAppointments = reservations.filter(res => {
      return res.status === 'pending';
    }).length;
    
    // Weekly appointments (next 7 days)
    const weeklyAppointments = reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      resDate.setHours(0, 0, 0, 0);
      const diffTime = resDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays < 7 && res.status !== 'canceled';
    }).length;
    
    // Calculate average rating if ratings exist
    let averageRating = 0;
    const ratingsCount = reservations.filter(res => res.rating).length;
    if (ratingsCount > 0) {
      const ratingsSum = reservations
        .filter(res => res.rating)
        .reduce((sum, res) => sum + res.rating, 0);
      averageRating = (ratingsSum / ratingsCount).toFixed(1);
    }
    
    setStats({
      todayAppointments,
      pendingAppointments,
      weeklyAppointments,
      averageRating,
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshReservations();
    setRefreshing(false);
  };

  const filteredReservations = () => {
    if (!reservations) return [];
    
    return reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      resDate.setHours(0, 0, 0, 0);
      
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      
      return resDate.getTime() === selected.getTime();
    });
  };

  const handleUpdateReservationStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from(TABLES.RESERVATIONS)
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      await refreshReservations();
      
      Alert.alert(
        translations.success, 
        translations.reservationStatusUpdated
      );
    } catch (error) {
      Alert.alert(
        translations.error, 
        error.message || translations.reservationUpdateFailed
      );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={businessProfile?.name || translations.beautyDashboard} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statsContainer}>
          <StatsCard
            title={translations.todayAppointments}
            value={stats.todayAppointments.toString()}
            icon="scissors"
            color={COLORS.primary}
          />
          <StatsCard
            title={translations.pendingAppointments}
            value={stats.pendingAppointments.toString()}
            icon="clock"
            color="#F5A623"
          />
          <StatsCard
            title={translations.weeklyAppointments}
            value={stats.weeklyAppointments.toString()}
            icon="calendar"
            color="#4CAF50"
          />
          <StatsCard
            title={translations.averageRating}
            value={stats.averageRating.toString()}
            icon="star"
            color="#FF5722"
          />
        </View>
        
        <CalendarView
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          reservations={reservations}
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {translations.appointmentsFor} {selectedDate.toLocaleDateString('hr-HR')}
          </Text>
        </View>
        
        {filteredReservations().length > 0 ? (
          filteredReservations().map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onUpdateStatus={handleUpdateReservationStatus}
              type="beauty"
            />
          ))
        ) : (
          <Card>
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={40} color={COLORS.grey} />
              <Text style={styles.emptyText}>
                {translations.noAppointmentsForDate}
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionHeader: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    color: COLORS.grey,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default BeautyDashboardScreen;
