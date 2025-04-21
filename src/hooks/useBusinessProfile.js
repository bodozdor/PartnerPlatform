import { useContext } from 'react';
import { BusinessContext } from '../context/BusinessContext';

/**
 * Hook for using business context
 * @returns {object} Business context values and methods
 */
export const useBusiness = () => {
  const context = useContext(BusinessContext);
  
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  
  return context;
};
