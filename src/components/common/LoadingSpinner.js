import React from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  Text 
} from 'react-native';
import { COLORS } from '../../styles/colors';

/**
 * Loading spinner component
 * @param {string} size - Size of the spinner (small, large)
 * @param {string} color - Color of the spinner
 * @param {string} message - Message to display under the spinner
 * @param {boolean} fullScreen - If spinner should be displayed in full screen
 * @param {object} style - Additional style for container
 */
const LoadingSpinner = ({ 
  size = 'large', 
  color = COLORS.primary, 
  message,
  fullScreen = true,
  style
}) => {
  return (
    <View style={[
      styles.container, 
      fullScreen ? styles.fullScreen : null,
      style
    ]}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
