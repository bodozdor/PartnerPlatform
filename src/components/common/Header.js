import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

/**
 * Header component
 * @param {string} title - Header title
 * @param {boolean} showBackButton - If back button should be shown
 * @param {function} onBackPress - Function to call when back button is pressed
 * @param {array} rightItems - Array of right items to show
 * @param {object} style - Additional style for header
 */
const Header = ({ 
  title, 
  showBackButton = false,
  onBackPress,
  rightItems,
  style
}) => {
  const renderRightItems = () => {
    if (!rightItems) return null;
    
    return (
      <View style={styles.rightItemsContainer}>
        {rightItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rightItem}
            onPress={item.onPress}
          >
            {item.icon && (
              <Feather name={item.icon} size={20} color={COLORS.primary} />
            )}
            {item.label && (
              <Text style={styles.rightItemLabel}>{item.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <View style={[styles.container, style]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.white} 
      />
      
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.rightContainer}>
        {renderRightItems()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  rightItemsContainer: {
    flexDirection: 'row',
  },
  rightItem: {
    marginLeft: 15,
  },
  rightItemLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Header;
