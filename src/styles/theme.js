import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';

/**
 * Combined theme object for styling across the app
 */
export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  
  // Border styles
  borders: {
    thin: {
      borderWidth: 1,
      borderColor: COLORS.lightGrey,
      borderRadius: SPACING.inputBorderRadius,
    },
    medium: {
      borderWidth: 2,
      borderColor: COLORS.lightGrey,
      borderRadius: SPACING.inputBorderRadius,
    },
    primary: {
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: SPACING.inputBorderRadius,
    },
    danger: {
      borderWidth: 1,
      borderColor: COLORS.danger,
      borderRadius: SPACING.inputBorderRadius,
    },
  },
  
  // Shadow styles
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
  },
  
  // Common component styles
  components: {
    // Card styles
    card: {
      container: {
        backgroundColor: COLORS.white,
        borderRadius: SPACING.cardBorderRadius,
        padding: SPACING.cardPadding,
        marginVertical: SPACING.cardMargin,
        ...{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        },
      },
      noPadding: {
        padding: 0,
      },
    },
    
    // Button styles
    button: {
      base: {
        height: SPACING.buttonHeight,
        borderRadius: SPACING.buttonBorderRadius,
        paddingHorizontal: SPACING.buttonPaddingHorizontal,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      primary: {
        backgroundColor: COLORS.primary,
      },
      secondary: {
        backgroundColor: COLORS.secondary,
      },
      danger: {
        backgroundColor: COLORS.danger,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
      },
      disabled: {
        backgroundColor: COLORS.lightGrey,
        opacity: 0.7,
      },
      small: {
        height: SPACING.buttonSmallHeight,
        paddingHorizontal: SPACING.sm,
      },
      large: {
        height: SPACING.buttonLargeHeight,
      },
      text: {
        color: COLORS.white,
        ...TYPOGRAPHY.button,
      },
      outlineText: {
        color: COLORS.primary,
        ...TYPOGRAPHY.button,
      },
      disabledText: {
        color: COLORS.grey,
      },
    },
    
    // Input styles
    input: {
      container: {
        marginBottom: SPACING.inputMarginBottom,
      },
      label: {
        ...TYPOGRAPHY.label,
        color: COLORS.dark,
        marginBottom: SPACING.xs,
      },
      field: {
        height: SPACING.inputHeight,
        borderWidth: SPACING.inputBorderWidth,
        borderColor: COLORS.lightGrey,
        borderRadius: SPACING.inputBorderRadius,
        paddingHorizontal: SPACING.inputPadding,
        backgroundColor: COLORS.white,
        color: COLORS.dark,
        ...TYPOGRAPHY.body1,
      },
      focused: {
        borderColor: COLORS.primary,
      },
      error: {
        borderColor: COLORS.danger,
      },
      errorText: {
        color: COLORS.danger,
        ...TYPOGRAPHY.caption,
        marginTop: SPACING.xs,
      },
      multiline: {
        minHeight: SPACING.inputHeight * 2,
        paddingTop: SPACING.inputPadding,
        textAlignVertical: 'top',
      },
    },
    
    // Header styles
    header: {
      container: {
        height: SPACING.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.headerPadding,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGrey,
      },
      title: {
        ...TYPOGRAPHY.h4,
        color: COLORS.dark,
      },
      icon: {
        color: COLORS.primary,
        padding: SPACING.xs,
      },
    },
    
    // Tab bar styles
    tabBar: {
      container: {
        flexDirection: 'row',
        height: SPACING.tabHeight,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGrey,
      },
      tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: SPACING.xs,
      },
      active: {
        color: COLORS.primary,
      },
      inactive: {
        color: COLORS.grey,
      },
      label: {
        ...TYPOGRAPHY.caption,
        marginTop: SPACING.tiny,
      },
    },
  },
  
  // Screen containers
  containers: {
    screen: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollView: {
      flexGrow: 1,
      padding: SPACING.screenPadding,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.screenPadding,
    },
  },
};
