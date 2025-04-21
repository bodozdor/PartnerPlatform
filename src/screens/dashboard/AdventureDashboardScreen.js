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

const AdventureDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  const { reservations, loading, refreshReservations } = useReservations();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    upcomingActivities: 0,
    confirmedBookings: 0,
    totalBookings: 0,
    averageGroupSize: 0,
  });

  useEffect(() => {
    loadStats();
  }, [reservations]);

  const loadStats = () => {
    if (!reservations) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Upcoming activities (next 14 days)
    const upcomingActivities = reservations.filter(res => {
      const activityDate = new Date(res.reservation_date);
      activityDate.setHours(0, 0, 0, 0);
      const diffTime = activityDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 14 && res.status !== 'canceled';
    }).length;
    
    // Confirmed bookings
    const confirmedBookings = reservations.filter(res => {
      return res.status === 'confirmed';
    }).length;
    
    // Total bookings
    const totalBookings = reservations.length;
    
    // Average group size
    let averageGroupSize = 0;
    const bookingsWithGroupSize = reservations.filter(res => res.num_people);
    if (bookingsWithGroupSize.length > 0) {
      const totalPeople = bookingsWithGroupSize.reduce((sum, res) => sum + (res.num_people || 1), 0);
      averageGroupSize = Math.round(totalPeople / bookingsWithGroupSize.length);
    }
    
    setStats({
      upcomingActivities,
      confirmedBookings,
      totalBookings,
      averageGroupSize,
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
      <Header title={businessProfile?.name || translations.adventureDashboard} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statsContainer}>
          <StatsCard
            title={translations.upcomingActivities}
            value={stats.upcomingActivities.toString()}
            icon="compass"
            color={COLORS.primary}
          />
          <StatsCard
            title={translations.confirmedBookings}
            value={stats.confirmedBookings.toString()}
            icon="check-circle"
            color="#4CAF50"
          />
          <StatsCard
            title={translations.totalBookings}
            value={stats.totalBookings.toString()}
            icon="book"
            color="#F5A623"
          />
          <StatsCard
            title={translations.averageGroupSize}
            value={stats.averageGroupSize.toString()}
            icon="users"
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
            {translations.activitiesFor} {selectedDate.toLocaleDateString('hr-HR')}
          </Text>
        </View>
        
        {filteredReservations().length > 0 ? (
          filteredReservations().map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onUpdateStatus={handleUpdateReservationStatus}
              type="adventure"
            />
          ))
        ) : (
          <Card>
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={40} color={COLORS.grey} />
              <Text style={styles.emptyText}>
                {translations.noActivitiesForDate}
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

export default AdventureDashboardScreen;
