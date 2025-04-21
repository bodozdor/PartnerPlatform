import React from 'react';
import { Platform } from 'react-native';
import LocationPickerNative from './LocationPicker';
import LocationPickerWeb from './LocationPickerWeb';

/**
 * LocationPickerWrapper - Provides the correct implementation based on platform
 * This prevents the web version from trying to import react-native-maps
 */
const LocationPickerWrapper = (props) => {
  if (Platform.OS === 'web') {
    return <LocationPickerWeb {...props} />;
  }

  return <LocationPickerNative {...props} />;
};

export default LocationPickerWrapper;