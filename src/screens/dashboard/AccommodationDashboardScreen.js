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

const AccommodationDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  const { reservations, loading, refreshReservations } = useReservations();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    upcomingCheckIns: 0,
    currentGuests: 0,
    totalReservations: 0,
    occupancyRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, [reservations]);

  const loadStats = () => {
    if (!reservations) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate upcoming check-ins (next 7 days)
    const upcomingCheckIns = reservations.filter(res => {
      const checkInDate = new Date(res.check_in_date);
      checkInDate.setHours(0, 0, 0, 0);
      const diffTime = checkInDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7 && res.status !== 'canceled';
    }).length;
    
    // Calculate current guests
    const currentGuests = reservations.filter(res => {
      const checkInDate = new Date(res.check_in_date);
      const checkOutDate = new Date(res.check_out_date);
      checkInDate.setHours(0, 0, 0, 0);
      checkOutDate.setHours(0, 0, 0, 0);
      return today >= checkInDate && today < checkOutDate && res.status === 'confirmed';
    }).length;
    
    const totalReservations = reservations.length;
    
    // Calculate occupancy rate (if we have room info)
    let occupancyRate = 0;
    if (businessProfile && businessProfile.num_rooms) {
      const occupiedRooms = currentGuests;
      occupancyRate = Math.round((occupiedRooms / businessProfile.num_rooms) * 100);
    }
    
    setStats({
      upcomingCheckIns,
      currentGuests,
      totalReservations,
      occupancyRate,
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
      // For accommodation, we show reservations that include the selected date
      const checkInDate = new Date(res.check_in_date);
      const checkOutDate = new Date(res.check_out_date);
      checkInDate.setHours(0, 0, 0, 0);
      checkOutDate.setHours(0, 0, 0, 0);
      
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      
      return selected >= checkInDate && selected < checkOutDate;
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
      <Header title={businessProfile?.name || translations.accommodationDashboard} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statsContainer}>
          <StatsCard
            title={translations.upcomingCheckIns}
            value={stats.upcomingCheckIns.toString()}
            icon="log-in"
            color={COLORS.primary}
          />
          <StatsCard
            title={translations.currentGuests}
            value={stats.currentGuests.toString()}
            icon="users"
            color="#4CAF50"
          />
          <StatsCard
            title={translations.totalReservations}
            value={stats.totalReservations.toString()}
            icon="book"
            color="#F5A623"
          />
          <StatsCard
            title={translations.occupancyRate}
            value={`${stats.occupancyRate}%`}
            icon="percent"
            color="#FF5722"
          />
        </View>
        
        <CalendarView
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          reservations={reservations}
          type="accommodation"
        />
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {translations.staysFor} {selectedDate.toLocaleDateString('hr-HR')}
          </Text>
        </View>
        
        {filteredReservations().length > 0 ? (
          filteredReservations().map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onUpdateStatus={handleUpdateReservationStatus}
              type="accommodation"
            />
          ))
        ) : (
          <Card>
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={40} color={COLORS.grey} />
              <Text style={styles.emptyText}>
                {translations.noReservationsForDate}
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

export default AccommodationDashboardScreen;
