import { Platform } from 'react-native';

/**
 * Typography styles for consistent text appearance
 */
export const TYPOGRAPHY = {
  // Font families
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  
  // Font weights
  fontWeights: {
    thin: '100',
    extraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
    giant: 48,
  },
  
  // Line heights
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 42,
    display: 48,
    giant: 60,
  },
  
  /**
   * Text styles
   * These combine font size, weight, and line height for common text styles
   */
  
  // Headers
  h1: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 42,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  
  // Body text
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  
  // Other text styles
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  
  // Helper for creating a text style with all properties
  createTextStyle: ({
    fontSize = 16,
    fontWeight = '400',
    lineHeight = 24,
    letterSpacing = 0,
    color,
    textAlign,
    textTransform,
  }) => ({
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    color,
    textAlign,
    textTransform,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
  }),
};
