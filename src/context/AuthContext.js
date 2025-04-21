import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../config/supabase';
import { translations } from '../utils/translations';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for existing session
    checkUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );
    
    // Cleanup listener
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
  // Get current auth status
  const checkUser = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user || null);
    } catch (error) {
      console.error('Error checking auth status:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up with email and password
  const signUp = async (email, password, name) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out
  const signOut = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
    } catch (error) {
      Alert.alert(translations.error, error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Reset password
  const resetPassword = async (email) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'partnerapp://reset-password',
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates,
      });
      
      if (error) throw error;
      
      // Update the user object with the new data
      setUser({
        ...user,
        user_metadata: {
          ...user.user_metadata,
          ...updates,
        },
      });
      
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };
  
  // Context value
  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
