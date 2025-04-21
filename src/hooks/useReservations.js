import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES } from '../config/supabase';
import { useAuth } from './useAuth';
import { useBusiness } from './useBusinessProfile';

/**
 * Hook for fetching and managing reservations
 * @returns {object} Reservations data and methods
 */
export const useReservations = () => {
  const { user } = useAuth();
  const { businessProfile } = useBusiness();
  
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchReservations = useCallback(async () => {
    if (!user || !businessProfile) {
      setReservations([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from(TABLES.RESERVATIONS)
        .select('*')
        .eq('business_id', businessProfile.id);
      
      // Sort by date - different field based on business type
      if (businessProfile.type === 'accommodation') {
        query = query.order('check_in_date', { ascending: true });
      } else {
        query = query.order('reservation_date', { ascending: true });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, businessProfile]);
  
  useEffect(() => {
    fetchReservations();
    
    // Set up real-time subscription for new reservations
    if (user && businessProfile) {
      const subscription = supabase
        .channel(`reservation_updates_${businessProfile.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: TABLES.RESERVATIONS,
            filter: `business_id=eq.${businessProfile.id}`,
          },
          () => {
            // Refresh reservations on any change
            fetchReservations();
          }
        )
        .subscribe();
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, businessProfile, fetchReservations]);
  
  return {
    reservations,
    loading,
    error,
    refreshReservations: fetchReservations,
  };
};
