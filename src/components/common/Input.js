import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

/**
 * Input component
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChangeText - Function to call when text changes
 * @param {string} placeholder - Input placeholder
 * @param {boolean} secureTextEntry - If input is for password
 * @param {string} keyboardType - Keyboard type
 * @param {boolean} multiline - If input is multiline
 * @param {number} numberOfLines - Number of lines for multiline input
 * @param {string} error - Error message
 * @param {boolean} required - If the field is required
 * @param {object} containerStyle - Additional style for container
 * @param {object} inputStyle - Additional style for input
 * @param {boolean} editable - If input is editable
 * @param {function} onBlur - Function to call when input loses focus
 * @param {string} autoCapitalize - Auto capitalize behavior
 */
const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  keyboardType = 'default', 
  multiline = false,
  numberOfLines = 1,
  error,
  required = false,
  containerStyle,
  inputStyle,
  editable = true,
  onBlur,
  autoCapitalize = 'sentences',
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredStar}>*</Text>}
        </View>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInput,
        error && styles.errorInput,
        !editable && styles.disabledInput,
        multiline && styles.multilineInput
      ]}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            multiline && styles.multilineTextInput
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          editable={editable}
          autoCapitalize={autoCapitalize}
          {...otherProps}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={togglePasswordVisibility}
          >
            <Feather 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={20} 
              color={COLORS.grey} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: COLORS.dark,
    marginBottom: 4,
  },
  requiredStar: {
    color: COLORS.danger,
    fontSize: 14,
    marginLeft: 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.dark,
  },
  focusedInput: {
    borderColor: COLORS.primary,
  },
  errorInput: {
    borderColor: COLORS.danger,
  },
  disabledInput: {
    backgroundColor: COLORS.lightGrey,
    opacity: 0.7,
  },
  multilineInput: {
    minHeight: 100,
    alignItems: 'flex-start',
  },
  multilineTextInput: {
    minHeight: 100,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;
