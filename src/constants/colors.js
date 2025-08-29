// Color Constants - กำหนดสีที่ใช้ในแอป
export const COLORS = {
  // Primary Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',
  
  // Secondary Colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7A79E0',
  
  // Background Colors
  background: '#F8F9FA',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#E9ECEF',
  
  // Text Colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  textWhite: '#FFFFFF',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Border Colors
  border: '#DDDDDD',
  borderLight: '#F0F0F0',
  
  // Shadow Colors
  shadow: '#000000',
};

// Theme configuration
export const THEME = {
  light: {
    background: COLORS.background,
    surface: COLORS.backgroundLight,
    text: COLORS.textPrimary,
    textSecondary: COLORS.textSecondary,
    border: COLORS.border,
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#333333',
  },
}; 