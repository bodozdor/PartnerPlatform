/**
 * Format date to local Croatian format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format time to local Croatian format
 * @param {string|Date} time - Time to format 
 * @returns {string} Formatted time
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  // Handle if time is a Date object
  if (time instanceof Date) {
    return time.toLocaleTimeString('hr-HR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Handle if time is a time string like "14:30:00"
  if (typeof time === 'string' && time.includes(':')) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }
  
  return time;
};

/**
 * Format price to Croatian currency format
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (HRK, EUR)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'EUR') => {
  if (!price && price !== 0) return '';
  
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: currency
  }).format(price);
};

/**
 * Convert GPS coordinates to a point string for Postgis
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {string} Point string
 */
export const coordsToPoint = (latitude, longitude) => {
  if (!latitude || !longitude) return null;
  return `POINT(${longitude} ${latitude})`;
};

/**
 * Calculate days difference between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {number} Number of days
 */
export const daysDifference = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Set times to midnight to calculate full days
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.substring(0, length) + '...';
};

/**
 * Get first letter of each word to create initials
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

/**
 * Format phone number to Croatian format
 * @param {string} phoneNumber - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Format based on Croatian phone number patterns
  if (digits.startsWith('385')) {
    // International format: +385 91 234 5678
    return `+385 ${digits.substring(3, 5)} ${digits.substring(5, 8)} ${digits.substring(8)}`;
  } else if (digits.startsWith('0')) {
    // National format: 091 234 5678
    return `0${digits.substring(1, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
  }
  
  return phoneNumber;
};
