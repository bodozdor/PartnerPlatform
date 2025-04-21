import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import { supabase, TABLES } from '../../config/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useBusiness } from '../../hooks/useBusinessProfile';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LocationPicker from '../../components/common/LocationPickerWrapper';
import ErrorMessage from '../../components/common/ErrorMessage';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Header from '../../components/common/Header';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import { Feather } from '@expo/vector-icons';

const BeautyProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { setBusinessProfile } = useBusiness();
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Profile details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [beautyType, setBeautyType] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [specialists, setSpecialists] = useState('');
  const [products, setProducts] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [location, setLocation] = useState(null);
  
  const handleSaveProfile = async () => {
    // Validate required fields
    if (!name || !description || !address || !phoneNumber || !beautyType || !location) {
      setErrorMsg(translations.requiredFieldsMessage);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Prepare business data
      const businessData = {
        user_id: user.id,
        type: 'beauty',
        name,
        description,
        address,
        phone_number: phoneNumber,
        website: website || null,
        beauty_type: beautyType,
        services_offered: servicesOffered || null,
        specialists: specialists || null,
        products: products || null,
        opening_hours: openingHours || null,
        location: location ? `POINT(${location.longitude} ${location.latitude})` : null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Insert business profile
      const { data, error } = await supabase
        .from(TABLES.BUSINESSES)
        .insert([businessData])
        .select();

      if (error) throw error;

      // Update context with business profile
      if (data && data[0]) {
        setBusinessProfile(data[0]);
        
        Alert.alert(
          translations.success,
          translations.profileCreatedSuccess,
          [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
        );
      }
    } catch (error) {
      setErrorMsg(error.message || translations.profileCreationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header 
        title={translations.createBeautyProfile} 
        showBackButton 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Feather name="scissors" size={40} color={COLORS.primary} />
          <Text style={styles.headerText}>{translations.beautyDetails}</Text>
          <Text style={styles.subtitle}>{translations.beautyProfileDescription}</Text>
        </View>

        {errorMsg ? <ErrorMessage message={errorMsg} /> : null}

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{translations.basicInformation}</Text>
          
          <Input
            label={translations.businessName}
            value={name}
            onChangeText={setName}
            placeholder={translations.beautyNamePlaceholder}
            required
          />

          <Input
            label={translations.description}
            value={description}
            onChangeText={setDescription}
            placeholder={translations.beautyDescriptionPlaceholder}
            multiline
            numberOfLines={4}
            required
          />

          <Input
            label={translations.phoneNumber}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={translations.phoneNumberPlaceholder}
            keyboardType="phone-pad"
            required
          />

          <Input
            label={translations.website}
            value={website}
            onChangeText={setWebsite}
            placeholder={translations.websitePlaceholder}
            keyboardType="url"
          />

          <Text style={styles.sectionTitle}>{translations.locationInformation}</Text>
          
          <Input
            label={translations.address}
            value={address}
            onChangeText={setAddress}
            placeholder={translations.addressPlaceholder}
            required
          />

          <LocationPicker
            label={translations.mapLocation}
            location={location}
            onLocationSelected={setLocation}
            required
          />

          <Text style={styles.sectionTitle}>{translations.beautySpecifics}</Text>
          
          <Input
            label={translations.beautyType}
            value={beautyType}
            onChangeText={setBeautyType}
            placeholder={translations.beautyTypePlaceholder}
            required
          />

          <Input
            label={translations.servicesOffered}
            value={servicesOffered}
            onChangeText={setServicesOffered}
            placeholder={translations.servicesOfferedPlaceholder}
            multiline
            numberOfLines={3}
          />

          <Input
            label={translations.specialists}
            value={specialists}
            onChangeText={setSpecialists}
            placeholder={translations.specialistsPlaceholder}
          />

          <Input
            label={translations.products}
            value={products}
            onChangeText={setProducts}
            placeholder={translations.productsPlaceholder}
            multiline
            numberOfLines={3}
          />

          <Input
            label={translations.openingHours}
            value={openingHours}
            onChangeText={setOpeningHours}
            placeholder={translations.openingHoursPlaceholder}
            multiline
            numberOfLines={3}
          />

          <Button 
            title={loading ? translations.saving : translations.saveProfile} 
            onPress={handleSaveProfile} 
            disabled={loading}
          />
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
});

export default BeautyProfileScreen;
