import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, TABLES } from '../config/supabase';

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessType, setBusinessType] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load business type from storage on initial render
    loadBusinessType();
  }, []);
  
  useEffect(() => {
    // When business type changes, load the business profile
    if (businessType) {
      loadBusinessProfile();
    }
  }, [businessType]);
  
  // Load business type from AsyncStorage
  const loadBusinessType = async () => {
    try {
      const storedType = await AsyncStorage.getItem('businessType');
      if (storedType) {
        setBusinessType(storedType);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading business type:', error);
      setLoading(false);
    }
  };
  
  // Save business type to AsyncStorage
  const saveBusinessType = async (type) => {
    try {
      await AsyncStorage.setItem('businessType', type);
      setBusinessType(type);
    } catch (error) {
      console.error('Error saving business type:', error);
    }
  };
  
  // Load business profile from the database
  const loadBusinessProfile = async () => {
    setLoading(true);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from(TABLES.BUSINESSES)
        .select('*')
        .eq('user_id', user.id)
        .eq('type', businessType)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading business profile:', error);
      }
      
      setBusinessProfile(data || null);
    } catch (error) {
      console.error('Error in loadBusinessProfile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Clear business profile and type
  const clearBusinessProfile = async () => {
    try {
      await AsyncStorage.removeItem('businessType');
      setBusinessType(null);
      setBusinessProfile(null);
    } catch (error) {
      console.error('Error clearing business type:', error);
    }
  };
  
  // Context value
  const value = {
    businessType,
    businessProfile,
    loading,
    setBusinessType: saveBusinessType,
    setBusinessProfile,
    clearBusinessProfile,
    refreshBusinessProfile: loadBusinessProfile,
  };
  
  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};
