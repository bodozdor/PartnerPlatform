import React from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import LocationPicker from './LocationPicker';
import { COLORS } from '../../styles/colors';

/**
 * LocationPickerWrapper - Returns LocationPicker for native platforms
 * For web, it returns a message that this feature is not available
 */
const LocationPickerWrapper = (props) => {
  // Since we're focusing on native mobile only for now, 
  // display a placeholder on web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webPlaceholder}>
        <Text style={styles.placeholderText}>
          Map functionality is only available in the native mobile app.
        </Text>
      </View>
    );
  }

  // Use the full LocationPicker on native platforms
  return <LocationPicker {...props} />;
};

const styles = StyleSheet.create({
  webPlaceholder: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.lightGrey,
  },
  placeholderText: {
    color: COLORS.dark,
    textAlign: 'center',
  }
});

export default LocationPickerWrapper;