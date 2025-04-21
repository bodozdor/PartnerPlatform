import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database table names for reference
export const TABLES = {
  PROFILES: 'profiles',
  BUSINESSES: 'businesses',
  RESERVATIONS: 'reservations',
  BUSINESS_HOURS: 'business_hours',
  SERVICES: 'services',
};

// Business types enum
export const BUSINESS_TYPES = {
  RESTAURANT: 'restaurant',
  CAFEBAR: 'cafebar',
  ACCOMMODATION: 'accommodation',
  FITNESS: 'fitness',
  BEAUTY: 'beauty',
  ADVENTURE: 'adventure',
};
