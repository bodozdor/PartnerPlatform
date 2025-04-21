import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { supabase, TABLES } from '../config/supabase';
import { useAuth } from '../hooks/useAuth';
import { useBusiness } from '../hooks/useBusinessProfile';
import { useReservations } from '../hooks/useReservations';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import ReservationCard from '../components/dashboard/ReservationCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { COLORS } from '../styles/colors';
import { translations } from '../utils/translations';
import { Feather } from '@expo/vector-icons';

const ReservationsScreen = () => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  const { reservations, loading, refreshReservations } = useReservations();
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filteredReservations, setFilteredReservations] = useState([]);
  
  useEffect(() => {
    if (reservations) {
      filterReservations();
    }
  }, [reservations, activeTab]);
  
  const filterReservations = () => {
    if (!reservations) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let filtered = [];
    
    switch (activeTab) {
      case 'upcoming':
        filtered = reservations.filter(res => {
          const resDate = new Date(res.reservation_date || res.check_in_date);
          return resDate >= today && res.status !== 'canceled';
        });
        break;
      case 'past':
        filtered = reservations.filter(res => {
          const resDate = new Date(res.reservation_date || res.check_in_date);
          return resDate < today || res.status === 'completed';
        });
        break;
      case 'canceled':
        filtered = reservations.filter(res => res.status === 'canceled');
        break;
      default:
        filtered = reservations;
    }
    
    // Sort by date (newest first for upcoming, oldest first for past and canceled)
    filtered.sort((a, b) => {
      const dateA = new Date(a.reservation_date || a.check_in_date);
      const dateB = new Date(b.reservation_date || b.check_in_date);
      return activeTab === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredReservations(filtered);
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshReservations();
    setRefreshing(false);
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
      <Header title={translations.reservations} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText
            ]}
          >
            {translations.upcoming}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'past' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText
            ]}
          >
            {translations.past}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'canceled' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('canceled')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'canceled' && styles.activeTabText
            ]}
          >
            {translations.canceled}
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredReservations.length > 0 ? (
        <FlatList
          data={filteredReservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ReservationCard
              reservation={item}
              onUpdateStatus={handleUpdateReservationStatus}
              type={businessProfile?.type}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Feather name="calendar" size={60} color={COLORS.lightGrey} />
          <Text style={styles.emptyText}>
            {activeTab === 'upcoming'
              ? translations.noUpcomingReservations
              : activeTab === 'past'
              ? translations.noPastReservations
              : translations.noCanceledReservations}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ReservationsScreen;
