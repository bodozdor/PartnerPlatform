import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

/**
 * Card component
 * @param {object} children - Card content
 * @param {object} style - Additional style for the card
 * @param {number} elevation - Card elevation (0-5)
 * @param {boolean} noPadding - If the card should not have padding
 */
const Card = ({ 
  children, 
  style, 
  elevation = 1,
  noPadding = false 
}) => {
  const getElevationStyle = () => {
    const elevationValue = Math.min(Math.max(elevation, 0), 5);
    
    return {
      shadowOpacity: 0.1 + (elevationValue * 0.05),
      shadowRadius: elevationValue,
      elevation: elevationValue,
    };
  };
  
  return (
    <View 
      style={[
        styles.card, 
        getElevationStyle(),
        noPadding ? { padding: 0 } : null,
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
});

export default Card;
