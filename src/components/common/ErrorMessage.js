import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

/**
 * ErrorMessage component
 * @param {string} message - Error message
 * @param {object} style - Additional style for container
 * @param {object} textStyle - Additional style for text
 */
const ErrorMessage = ({ message, style, textStyle }) => {
  if (!message) return null;
  
  return (
    <View style={[styles.container, style]}>
      <Feather name="alert-circle" size={18} color={COLORS.danger} />
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerLight,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: COLORS.danger,
    marginLeft: 10,
  },
});

export default ErrorMessage;
