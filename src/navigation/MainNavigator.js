import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import BusinessTypeScreen from '../screens/BusinessTypeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Profile screens
import RestaurantProfileScreen from '../screens/profile/RestaurantProfileScreen';
import CafebarProfileScreen from '../screens/profile/CafebarProfileScreen';
import AccommodationProfileScreen from '../screens/profile/AccommodationProfileScreen';
import FitnessProfileScreen from '../screens/profile/FitnessProfileScreen';
import BeautyProfileScreen from '../screens/profile/BeautyProfileScreen';
import AdventureProfileScreen from '../screens/profile/AdventureProfileScreen';

// Dashboard screens
import RestaurantDashboardScreen from '../screens/dashboard/RestaurantDashboardScreen';
import CafebarDashboardScreen from '../screens/dashboard/CafebarDashboardScreen';
import AccommodationDashboardScreen from '../screens/dashboard/AccommodationDashboardScreen';
import FitnessDashboardScreen from '../screens/dashboard/FitnessDashboardScreen';
import BeautyDashboardScreen from '../screens/dashboard/BeautyDashboardScreen';
import AdventureDashboardScreen from '../screens/dashboard/AdventureDashboardScreen';

import { COLORS } from '../styles/colors';
import { translations } from '../utils/translations';
import { useBusiness } from '../hooks/useBusinessProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Dashboard Stack Navigator
const DashboardNavigator = () => {
  const { businessType } = useBusiness();

  // Determine which dashboard to display based on business type
  const getDashboardScreen = () => {
    switch (businessType) {
      case 'restaurant':
        return RestaurantDashboardScreen;
      case 'cafebar':
        return CafebarDashboardScreen;
      case 'accommodation':
        return AccommodationDashboardScreen;
      case 'fitness':
        return FitnessDashboardScreen;
      case 'beauty':
        return BeautyDashboardScreen;
      case 'adventure':
        return AdventureDashboardScreen;
      default:
        return BusinessTypeScreen;
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {businessType ? (
        <Stack.Screen
          name="Dashboard"
          component={getDashboardScreen()}
          options={{ title: translations.dashboard }}
        />
      ) : (
        <Stack.Screen
          name="BusinessType"
          component={BusinessTypeScreen}
          options={{ title: translations.businessType }}
        />
      )}
      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfileScreen}
        options={{ title: translations.restaurantProfile }}
      />
      <Stack.Screen
        name="CafebarProfile"
        component={CafebarProfileScreen}
        options={{ title: translations.cafebarProfile }}
      />
      <Stack.Screen
        name="AccommodationProfile"
        component={AccommodationProfileScreen}
        options={{ title: translations.accommodationProfile }}
      />
      <Stack.Screen
        name="FitnessProfile"
        component={FitnessProfileScreen}
        options={{ title: translations.fitnessProfile }}
      />
      <Stack.Screen
        name="BeautyProfile"
        component={BeautyProfileScreen}
        options={{ title: translations.beautyProfile }}
      />
      <Stack.Screen
        name="AdventureProfile"
        component={AdventureProfileScreen}
        options={{ title: translations.adventureProfile }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Reservations') {
            iconName = 'calendar';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGrey,
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardNavigator} 
        options={{ title: translations.home }}
      />
      <Tab.Screen 
        name="Reservations" 
        component={ReservationsScreen} 
        options={{ title: translations.reservations }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: translations.profile }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: translations.settings }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
