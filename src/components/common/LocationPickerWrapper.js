import React from 'react';
import LocationPicker from './LocationPicker';

/**
 * LocationPickerWrapper - Direct pass-through to LocationPicker
 * This component is maintained for compatibility with existing code that uses it
 */
const LocationPickerWrapper = (props) => {
  return <LocationPicker {...props} />;
};

export default LocationPickerWrapper;