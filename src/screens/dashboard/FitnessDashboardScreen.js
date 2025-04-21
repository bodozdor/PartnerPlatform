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

const FitnessDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  const { reservations, loading, refreshReservations } = useReservations();
  
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    todayClasses: 0,
    weeklyClasses: 0,
    monthlyClients: 0,
    averageRating: 0,
  });

  useEffect(() => {
    loadStats();
  }, [reservations]);

  const loadStats = () => {
    if (!reservations) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Today's classes
    const todayClasses = reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      resDate.setHours(0, 0, 0, 0);
      return resDate.getTime() === today.getTime() && res.status !== 'canceled';
    }).length;
    
    // Weekly classes (next 7 days)
    const weeklyClasses = reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      resDate.setHours(0, 0, 0, 0);
      const diffTime = resDate.getTime() - today.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays < 7 && res.status !== 'canceled';
    }).length;
    
    // Monthly clients (unique clients in the past 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const monthlyClients = reservations.filter(res => {
      const resDate = new Date(res.reservation_date);
      return resDate >= thirtyDaysAgo && resDate <= today && res.status === 'completed';
    }).reduce((unique, res) => {
      if (!unique.includes(res.client_id)) {
        unique.push(res.client_id);
      }
      return unique;
    }, []).length;
    
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
      todayClasses,
      weeklyClasses,
      monthlyClients,
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
      <Header title={businessProfile?.name || translations.fitnessDashboard} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statsContainer}>
          <StatsCard
            title={translations.todayClasses}
            value={stats.todayClasses.toString()}
            icon="activity"
            color={COLORS.primary}
          />
          <StatsCard
            title={translations.weeklyClasses}
            value={stats.weeklyClasses.toString()}
            icon="calendar"
            color="#4CAF50"
          />
          <StatsCard
            title={translations.monthlyClients}
            value={stats.monthlyClients.toString()}
            icon="users"
            color="#F5A623"
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
            {translations.classesFor} {selectedDate.toLocaleDateString('hr-HR')}
          </Text>
        </View>
        
        {filteredReservations().length > 0 ? (
          filteredReservations().map(reservation => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onUpdateStatus={handleUpdateReservationStatus}
              type="fitness"
            />
          ))
        ) : (
          <Card>
            <View style={styles.emptyContainer}>
              <Feather name="calendar" size={40} color={COLORS.grey} />
              <Text style={styles.emptyText}>
                {translations.noClassesForDate}
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

export default FitnessDashboardScreen;
