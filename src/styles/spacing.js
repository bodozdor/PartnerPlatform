/**
 * Spacing constants for consistent margins and paddings
 */
export const SPACING = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Screen edges padding
  screenPadding: 16,
  
  // Form fields
  inputHeight: 48,
  inputPadding: 16,
  inputMarginBottom: 16,
  inputBorderRadius: 8,
  inputBorderWidth: 1,
  
  // Buttons
  buttonHeight: 48,
  buttonSmallHeight: 36,
  buttonLargeHeight: 56,
  buttonBorderRadius: 8,
  buttonPaddingHorizontal: 20,
  
  // Cards
  cardPadding: 16,
  cardMargin: 8,
  cardBorderRadius: 8,
  
  // Lists
  listItemPadding: 16,
  listItemMargin: 8,
  
  // Headers
  headerHeight: 56,
  headerPadding: 16,
  
  // Tabs
  tabHeight: 48,
  
  // Modals
  modalPadding: 24,
  modalBorderRadius: 12,
  
  // Create different spacing patterns
  tiny: 2,
  xxxs: 4,
  xxs: 6,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
  
  // Helper function to get consistent spacing
  getSpacing: (multiplier = 1) => {
    return 8 * multiplier;
  },
  
  // Dynamic spacing with breakpoints
  // For responsive layouts
  responsive: {
    small: {
      screenPadding: 12,
      cardPadding: 12,
    },
    medium: {
      screenPadding: 16,
      cardPadding: 16,
    },
    large: {
      screenPadding: 24,
      cardPadding: 20,
    },
  },
  
  // Layout grid
  grid: {
    gutter: 16,
    margin: 16,
    column: 1 / 12,
  }
};
