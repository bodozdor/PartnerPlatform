/**
 * Mock module for react-native-maps on web
 * This provides a stub implementation that doesn't use native modules
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

// Mock MapView component
const MapView = ({ style, children }) => {
  return (
    <View style={[styles.mapContainer, style]}>
      <Text style={styles.webMapText}>Map view not available on web</Text>
      {children}
    </View>
  );
};

// Mock Marker component
const Marker = ({ coordinate }) => {
  return null; // No rendering on web
};

// Mock all other exports to prevent import errors
MapView.Marker = Marker;
MapView.Polyline = () => null;
MapView.Polygon = () => null;
MapView.Circle = () => null;
MapView.Callout = () => null;

// Mock native command modules
const codegenNativeCommands = {
  // Add any necessary mock implementations
};

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webMapText: {
    color: COLORS.grey,
    fontStyle: 'italic',
  },
});

// Export everything that might be imported from react-native-maps
export { 
  Marker,
  codegenNativeCommands 
};

// For any other import patterns
export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = 'default';
export const ProviderPropType = {};
export const MAP_TYPES = {
  STANDARD: 'standard',
  SATELLITE: 'satellite',
  HYBRID: 'hybrid',
  TERRAIN: 'terrain',
  NONE: 'none'
};

// Default export for the main component
export default MapView;