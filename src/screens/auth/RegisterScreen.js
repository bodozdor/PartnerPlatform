import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform,
  Alert 
} from 'react-native';
import { supabase } from '../../config/supabase';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import { validateEmail, validatePassword } from '../../utils/validation';
import ErrorMessage from '../../components/common/ErrorMessage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg(translations.allFieldsRequired);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg(translations.invalidEmail);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMsg(translations.passwordRequirements);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(translations.passwordsDoNotMatch);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Register user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      // Create profile in the database
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              name, 
              email,
              created_at: new Date(),
            }
          ]);

        if (profileError) throw profileError;
      }

      Alert.alert(
        translations.registrationSuccessful,
        translations.verifyEmail,
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      setErrorMsg(error.message || translations.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{translations.createAccount}</Text>
          <Text style={styles.subtitle}>{translations.registerSubtitle}</Text>
        </View>

        {errorMsg ? <ErrorMessage message={errorMsg} /> : null}

        <View style={styles.formContainer}>
          <Input
            label={translations.name}
            value={name}
            onChangeText={setName}
            placeholder={translations.namePlaceholder}
          />

          <Input
            label={translations.email}
            value={email}
            onChangeText={setEmail}
            placeholder={translations.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label={translations.password}
            value={password}
            onChangeText={setPassword}
            placeholder={translations.passwordPlaceholder}
            secureTextEntry
          />

          <Input
            label={translations.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={translations.confirmPasswordPlaceholder}
            secureTextEntry
          />

          <Button 
            title={loading ? translations.registering : translations.register} 
            onPress={handleRegister} 
            disabled={loading}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              {translations.alreadyHaveAccount} 
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>
                {translations.login}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading && <LoadingSpinner />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default RegisterScreen;
