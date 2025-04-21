import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { COLORS } from '../../styles/colors';

/**
 * Button component
 * @param {string} title - Button text
 * @param {function} onPress - Function to call on button press
 * @param {boolean} disabled - If button is disabled
 * @param {string} type - Button type (primary, secondary, outline, danger)
 * @param {string} size - Button size (normal, small, large)
 * @param {object} style - Additional style for button
 * @param {object} textStyle - Additional style for button text
 * @param {boolean} loading - Show loading indicator
 */
const Button = ({ 
  title, 
  onPress, 
  disabled = false, 
  type = 'primary', 
  size = 'normal',
  style,
  textStyle,
  loading = false 
}) => {
  const getButtonStyles = () => {
    let buttonStyle = [styles.button];
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
    }
    
    // Type styles
    switch (type) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'danger':
        buttonStyle.push(styles.dangerButton);
        break;
    }
    
    // Disabled style
    if (disabled || loading) {
      buttonStyle.push(styles.disabledButton);
    }
    
    // Custom style
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };
  
  const getTextStyles = () => {
    let textStyleArray = [styles.buttonText];
    
    // Size styles
    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallButtonText);
        break;
      case 'large':
        textStyleArray.push(styles.largeButtonText);
        break;
    }
    
    // Type styles
    switch (type) {
      case 'outline':
        textStyleArray.push(styles.outlineButtonText);
        break;
      case 'secondary':
        textStyleArray.push(styles.secondaryButtonText);
        break;
      case 'danger':
        textStyleArray.push(styles.dangerButtonText);
        break;
    }
    
    // Disabled text style
    if (disabled || loading) {
      textStyleArray.push(styles.disabledButtonText);
    }
    
    // Custom text style
    if (textStyle) {
      textStyleArray.push(textStyle);
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dangerButton: {
    backgroundColor: COLORS.danger,
  },
  disabledButton: {
    backgroundColor: COLORS.lightGrey,
    borderColor: COLORS.lightGrey,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  outlineButtonText: {
    color: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.dark,
  },
  dangerButtonText: {
    color: COLORS.white,
  },
  disabledButtonText: {
    color: COLORS.grey,
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
});

export default Button;
