import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { translations } from '../utils/translations';
import { useBusiness } from '../hooks/useBusinessProfile';
import Card from '../components/common/Card';
import Header from '../components/common/Header';

const BusinessTypeScreen = ({ navigation }) => {
  const { setBusinessType } = useBusiness();

  const businessTypes = [
    {
      id: 'restaurant',
      name: translations.restaurant,
      icon: 'coffee',
      screen: 'RestaurantProfile',
      description: translations.restaurantDescription,
    },
    {
      id: 'cafebar',
      name: translations.cafebar,
      icon: 'coffee',
      screen: 'CafebarProfile',
      description: translations.cafebarDescription,
    },
    {
      id: 'accommodation',
      name: translations.accommodation,
      icon: 'home',
      screen: 'AccommodationProfile',
      description: translations.accommodationDescription,
    },
    {
      id: 'fitness',
      name: translations.fitness,
      icon: 'activity',
      screen: 'FitnessProfile',
      description: translations.fitnessDescription,
    },
    {
      id: 'beauty',
      name: translations.beauty,
      icon: 'scissors',
      screen: 'BeautyProfile',
      description: translations.beautyDescription,
    },
    {
      id: 'adventure',
      name: translations.adventure,
      icon: 'compass',
      screen: 'AdventureProfile',
      description: translations.adventureDescription,
    },
  ];

  const handleSelectBusinessType = (type) => {
    setBusinessType(type);
    navigation.navigate('Register', { businessType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={translations.selectBusinessType} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{translations.welcomeMessage}</Text>
          <Text style={styles.subtitle}>{translations.businessTypeInstructions}</Text>
        </View>

        <View style={styles.cardsContainer}>
          {businessTypes.map((business) => (
            <TouchableOpacity 
              key={business.id}
              onPress={() => handleSelectBusinessType(business.id)}
              style={styles.cardWrapper}
            >
              <Card>
                <View style={styles.businessCard}>
                  <View style={styles.iconContainer}>
                    <Feather name={business.icon} size={28} color={COLORS.primary} />
                  </View>
                  <View style={styles.businessInfo}>
                    <Text style={styles.businessName}>{business.name}</Text>
                    <Text style={styles.businessDescription}>{business.description}</Text>
                  </View>
                  <Feather name="chevron-right" size={20} color={COLORS.grey} />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
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
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  cardsContainer: {
    width: '100%',
  },
  cardWrapper: {
    marginBottom: 15,
  },
  businessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  businessDescription: {
    fontSize: 14,
    color: COLORS.grey,
  },
});

export default BusinessTypeScreen;
