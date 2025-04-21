/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} Is email valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * @param {string} password - Password to validate
 * @returns {boolean} Is password valid
 */
export const validatePassword = (password) => {
  if (!password) return false;
  
  // Minimum 6 characters
  return password.length >= 6;
};

/**
 * Phone number validation (Croatian format)
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} Is phone number valid
 */
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');
  
  // Croatian phone numbers are typically 9-10 digits
  // If international format: +385 followed by 9 digits
  // If national format: starts with 0 followed by 9 digits
  if (digits.startsWith('385')) {
    return digits.length === 12;
  } else if (digits.startsWith('0')) {
    return digits.length === 10;
  }
  
  return false;
};

/**
 * Website URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} Is URL valid
 */
export const validateWebsite = (url) => {
  if (!url) return true; // Website is optional
  
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return urlRegex.test(url);
};

/**
 * Numeric value validation
 * @param {string} value - Value to validate
 * @returns {boolean} Is value numeric
 */
export const validateNumeric = (value) => {
  if (!value && value !== '0') return true; // Allow empty
  
  return /^\d+$/.test(value);
};

/**
 * Required field validation
 * @param {string} value - Value to validate
 * @returns {boolean} Is value provided
 */
export const validateRequired = (value) => {
  if (value === null || value === undefined) return false;
  
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  
  return true;
};

/**
 * Date validation
 * @param {string|Date} date - Date to validate
 * @returns {boolean} Is date valid
 */
export const validateDate = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
};

/**
 * Time validation (HH:MM format)
 * @param {string} time - Time to validate
 * @returns {boolean} Is time valid
 */
export const validateTime = (time) => {
  if (!time) return false;
  
  // Check for HH:MM format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Form validation helper
 * @param {object} form - Form data
 * @param {array} requiredFields - Array of required field names
 * @returns {object} Validation result with isValid flag and errors object
 */
export const validateForm = (form, requiredFields = []) => {
  const errors = {};
  let isValid = true;
  
  // Check required fields
  for (const field of requiredFields) {
    if (!validateRequired(form[field])) {
      errors[field] = 'Ovo polje je obavezno';
      isValid = false;
    }
  }
  
  // Validate email if present
  if (form.email && !validateEmail(form.email)) {
    errors.email = 'Unesite ispravnu e-mail adresu';
    isValid = false;
  }
  
  // Validate phone if present
  if (form.phoneNumber && !validatePhoneNumber(form.phoneNumber)) {
    errors.phoneNumber = 'Unesite ispravan telefonski broj';
    isValid = false;
  }
  
  // Validate website if present
  if (form.website && !validateWebsite(form.website)) {
    errors.website = 'Unesite ispravnu web adresu';
    isValid = false;
  }
  
  return { isValid, errors };
};
