import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { BusinessProvider } from './src/context/BusinessContext';
import { supabase } from './src/config/supabase';
import LoadingSpinner from './src/components/common/LoadingSpinner';
import { COLORS } from './src/styles/colors';

/**
 * Web-specific application entry point
 * This is a simplified version for web that doesn't use components that rely on native-only modules
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
      setIsLoading(false);
    };
    
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }
  
  // Render a simple web interface
  return (
    <AuthProvider>
      <BusinessProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Gusht Partner Web</Text>
          <Text style={styles.subtitle}>
            Za potpuno iskustvo, molimo vas koristite mobilnu aplikaciju.
          </Text>
          <Text style={styles.info}>
            Ova web verzija je ograničena i ne sadrži sve funkcionalnosti dostupne u mobilnoj aplikaciji.
          </Text>
          {user ? (
            <Text style={styles.userInfo}>Prijavljeni ste kao: {user.email}</Text>
          ) : (
            <Text style={styles.userInfo}>Niste prijavljeni</Text>
          )}
        </View>
      </BusinessProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  userInfo: {
    fontSize: 16,
    padding: 10,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
  }
});