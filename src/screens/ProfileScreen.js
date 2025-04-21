import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  SafeAreaView,
  Image
} from 'react-native';
import { supabase, TABLES, BUSINESS_TYPES } from '../config/supabase';
import { useAuth } from '../hooks/useAuth';
import { useBusiness } from '../hooks/useBusinessProfile';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { COLORS } from '../styles/colors';
import { translations } from '../utils/translations';
import { Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const { user, signOut } = useAuth();
  const { businessProfile, setBusinessProfile, clearBusinessProfile } = useBusiness();
  
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  useEffect(() => {
    fetchUserProfile();
  }, [user]);
  
  const fetchUserProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditProfile = () => {
    // Navigate to edit profile screen based on business type
    if (businessProfile) {
      const businessType = businessProfile.type;
      switch (businessType) {
        case BUSINESS_TYPES.RESTAURANT:
          navigation.navigate('RestaurantProfile');
          break;
        case BUSINESS_TYPES.CAFEBAR:
          navigation.navigate('CafebarProfile');
          break;
        case BUSINESS_TYPES.ACCOMMODATION:
          navigation.navigate('AccommodationProfile');
          break;
        case BUSINESS_TYPES.FITNESS:
          navigation.navigate('FitnessProfile');
          break;
        case BUSINESS_TYPES.BEAUTY:
          navigation.navigate('BeautyProfile');
          break;
        case BUSINESS_TYPES.ADVENTURE:
          navigation.navigate('AdventureProfile');
          break;
        default:
          navigation.navigate('BusinessType');
      }
    } else {
      navigation.navigate('BusinessType');
    }
  };
  
  const handleSwitchBusinessType = () => {
    Alert.alert(
      translations.switchBusinessType,
      translations.switchBusinessTypeConfirm,
      [
        {
          text: translations.cancel,
          style: 'cancel'
        },
        {
          text: translations.confirm,
          onPress: () => {
            clearBusinessProfile();
            navigation.navigate('BusinessType');
          }
        }
      ]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      translations.logout,
      translations.logoutConfirm,
      [
        {
          text: translations.cancel,
          style: 'cancel'
        },
        {
          text: translations.confirm,
          onPress: signOut
        }
      ]
    );
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  const getBusinessTypeIcon = (type) => {
    switch (type) {
      case 'restaurant':
        return 'coffee';
      case 'cafebar':
        return 'coffee';
      case 'accommodation':
        return 'home';
      case 'fitness':
        return 'activity';
      case 'beauty':
        return 'scissors';
      case 'adventure':
        return 'compass';
      default:
        return 'briefcase';
    }
  };
  
  const getBusinessTypeLabel = (type) => {
    switch (type) {
      case 'restaurant':
        return translations.restaurant;
      case 'cafebar':
        return translations.cafebar;
      case 'accommodation':
        return translations.accommodation;
      case 'fitness':
        return translations.fitness;
      case 'beauty':
        return translations.beauty;
      case 'adventure':
        return translations.adventure;
      default:
        return translations.business;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={translations.profile} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={40} color={COLORS.white} />
            </View>
          </View>
          
          <Text style={styles.userName}>
            {userProfile?.name || user?.email}
          </Text>
          
          <Text style={styles.userEmail}>
            {user?.email}
          </Text>
        </View>
        
        {businessProfile ? (
          <Card>
            <View style={styles.businessContainer}>
              <View style={styles.businessIconContainer}>
                <Feather 
                  name={getBusinessTypeIcon(businessProfile.type)} 
                  size={24} 
                  color={COLORS.white} 
                />
              </View>
              
              <View style={styles.businessInfo}>
                <Text style={styles.businessType}>
                  {getBusinessTypeLabel(businessProfile.type)}
                </Text>
                <Text style={styles.businessName}>
                  {businessProfile.name}
                </Text>
                <Text style={styles.businessAddress}>
                  {businessProfile.address}
                </Text>
              </View>
            </View>
          </Card>
        ) : (
          <Card>
            <View style={styles.noBusinessContainer}>
              <Feather name="briefcase" size={40} color={COLORS.grey} />
              <Text style={styles.noBusinessText}>
                {translations.noBusinessProfile}
              </Text>
              <Button 
                title={translations.createBusinessProfile}
                onPress={() => navigation.navigate('BusinessType')}
                size="small"
              />
            </View>
          </Card>
        )}
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEditProfile}
          >
            <Feather name="edit" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>
              {businessProfile 
                ? translations.editBusinessProfile 
                : translations.createBusinessProfile}
            </Text>
          </TouchableOpacity>
          
          {businessProfile && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleSwitchBusinessType}
            >
              <Feather name="refresh-cw" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>
                {translations.switchBusinessType}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color={COLORS.danger} />
            <Text style={[styles.actionText, { color: COLORS.danger }]}>
              {translations.logout}
            </Text>
          </TouchableOpacity>
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
    padding: 15,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 10,
  },
  businessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  businessIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  businessInfo: {
    flex: 1,
  },
  businessType: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 2,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 2,
  },
  businessAddress: {
    fontSize: 14,
    color: COLORS.grey,
  },
  noBusinessContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  noBusinessText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginVertical: 10,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  actionText: {
    fontSize: 16,
    color: COLORS.dark,
    marginLeft: 15,
  },
});

export default ProfileScreen;
