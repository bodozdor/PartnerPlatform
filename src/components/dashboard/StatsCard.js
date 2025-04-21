import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import Card from '../common/Card';

/**
 * StatsCard component for displaying dashboard statistics
 * @param {string} title - Stat title
 * @param {string} value - Stat value
 * @param {string} icon - Feather icon name
 * @param {string} color - Icon color
 * @param {object} style - Additional style for card
 */
const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = COLORS.primary,
  style
}) => {
  return (
    <Card style={[styles.card, style]}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Feather name={icon} size={20} color={color} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 6,
    padding: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});

export default StatsCard;
