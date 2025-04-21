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
import { validateEmail } from '../../utils/validation';
import ErrorMessage from '../../components/common/ErrorMessage';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResetPassword = async () => {
    // Validate input
    if (!email) {
      setErrorMsg(translations.emailRequired);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg(translations.invalidEmail);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'partnerapp://reset-password',
      });

      if (error) throw error;

      Alert.alert(
        translations.resetPasswordEmailSent,
        translations.checkEmailForReset,
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      setErrorMsg(error.message || translations.resetPasswordFailed);
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
          <Text style={styles.headerText}>{translations.forgotPassword}</Text>
          <Text style={styles.subtitle}>{translations.forgotPasswordInstructions}</Text>
        </View>

        {errorMsg ? <ErrorMessage message={errorMsg} /> : null}

        <View style={styles.formContainer}>
          <Input
            label={translations.email}
            value={email}
            onChangeText={setEmail}
            placeholder={translations.emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button 
            title={loading ? translations.sending : translations.sendResetLink} 
            onPress={handleResetPassword} 
            disabled={loading}
          />

          <TouchableOpacity 
            style={styles.backToLogin} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backToLoginText}>
              {translations.backToLogin}
            </Text>
          </TouchableOpacity>
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
    marginVertical: 40,
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
    marginHorizontal: 20,
  },
  formContainer: {
    width: '100%',
  },
  backToLogin: {
    alignSelf: 'center',
    marginTop: 20,
  },
  backToLoginText: {
    color: COLORS.primary,
    fontSize: 14,
  }
});

export default ForgotPasswordScreen;
