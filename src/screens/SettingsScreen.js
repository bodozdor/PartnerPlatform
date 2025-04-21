import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert,
  SafeAreaView
} from 'react-native';
import { supabase } from '../config/supabase';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { COLORS } from '../styles/colors';
import { translations } from '../utils/translations';
import { Feather } from '@expo/vector-icons';

const SettingsScreen = () => {
  const { user, signOut } = useAuth();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleChangePassword = async () => {
    // Validate passwords
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(translations.error, translations.allFieldsRequired);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert(translations.error, translations.passwordsDoNotMatch);
      return;
    }
    
    if (newPassword.length < 6) {
      Alert.alert(translations.error, translations.passwordTooShort);
      return;
    }
    
    setLoading(true);
    
    try {
      // First verify the current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      
      if (signInError) throw new Error(translations.currentPasswordIncorrect);
      
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      Alert.alert(
        translations.success,
        translations.passwordChangeSuccess,
        [{ text: 'OK', onPress: () => setShowPasswordForm(false) }]
      );
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert(translations.error, error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      translations.deleteAccount,
      translations.deleteAccountConfirmation,
      [
        {
          text: translations.cancel,
          style: 'cancel'
        },
        {
          text: translations.delete,
          style: 'destructive',
          onPress: () => {
            // Request a second confirmation
            Alert.alert(
              translations.finalWarning,
              translations.deleteAccountFinalWarning,
              [
                {
                  text: translations.cancel,
                  style: 'cancel'
                },
                {
                  text: translations.delete,
                  style: 'destructive',
                  onPress: confirmDeleteAccount
                }
              ]
            );
          }
        }
      ]
    );
  };
  
  const confirmDeleteAccount = async () => {
    setLoading(true);
    
    try {
      // Delete user data from database
      await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
        
      // Delete user authentication
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;
      
      // Sign out
      await signOut();
      
    } catch (error) {
      Alert.alert(translations.error, error.message);
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title={translations.settings} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>{translations.appearance}</Text>
        
        <Card>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="moon" size={20} color={COLORS.dark} />
              <Text style={styles.settingLabel}>{translations.darkMode}</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryLight }}
              thumbColor={darkMode ? COLORS.primary : COLORS.white}
            />
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>{translations.notifications}</Text>
        
        <Card>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="bell" size={20} color={COLORS.dark} />
              <Text style={styles.settingLabel}>{translations.pushNotifications}</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryLight }}
              thumbColor={pushNotifications ? COLORS.primary : COLORS.white}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="mail" size={20} color={COLORS.dark} />
              <Text style={styles.settingLabel}>{translations.emailNotifications}</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: COLORS.lightGrey, true: COLORS.primaryLight }}
              thumbColor={emailNotifications ? COLORS.primary : COLORS.white}
            />
          </View>
        </Card>
        
        <Text style={styles.sectionTitle}>{translations.security}</Text>
        
        <Card>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowPasswordForm(!showPasswordForm)}
          >
            <View style={styles.settingInfo}>
              <Feather name="lock" size={20} color={COLORS.dark} />
              <Text style={styles.settingLabel}>{translations.changePassword}</Text>
            </View>
            <Feather 
              name={showPasswordForm ? "chevron-up" : "chevron-right"} 
              size={20} 
              color={COLORS.grey} 
            />
          </TouchableOpacity>
          
          {showPasswordForm && (
            <View style={styles.passwordForm}>
              <Input
                label={translations.currentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholder={translations.enterCurrentPassword}
              />
              
              <Input
                label={translations.newPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholder={translations.enterNewPassword}
              />
              
              <Input
                label={translations.confirmNewPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder={translations.confirmNewPassword}
              />
              
              <Button
                title={translations.updatePassword}
                onPress={handleChangePassword}
              />
            </View>
          )}
        </Card>
        
        <Text style={styles.sectionTitle}>{translations.account}</Text>
        
        <Card>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleDeleteAccount}
          >
            <View style={styles.settingInfo}>
              <Feather name="trash-2" size={20} color={COLORS.danger} />
              <Text style={[styles.settingLabel, { color: COLORS.danger }]}>
                {translations.deleteAccount}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.grey} />
          </TouchableOpacity>
        </Card>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Partner App v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: COLORS.dark,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: 15,
  },
  passwordForm: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.grey,
  },
});

export default SettingsScreen;
