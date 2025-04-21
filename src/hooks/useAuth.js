import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook for using auth context
 * @returns {object} Auth context values and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
