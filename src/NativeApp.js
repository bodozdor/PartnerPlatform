import React, { useState, useEffect } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import { supabase } from './config/supabase';
import LoadingSpinner from './components/common/LoadingSpinner';
import { COLORS } from './styles/colors';

/**
 * Native-only app implementation with full functionality
 * This only runs on native platforms, not on web
 */
const NativeApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Auth');

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setInitialRoute('Main');
      }
      setIsLoading(false);
    };
    
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  return (
    <AuthProvider>
      <BusinessProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <AppNavigator initialRoute={initialRoute} />
        </NavigationContainer>
      </BusinessProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default NativeApp;