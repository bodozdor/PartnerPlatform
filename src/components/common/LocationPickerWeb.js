import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { MAPBOX_ACCESS_TOKEN, DEFAULT_REGION, GEOCODING_API_URL } from '../../config/supabase';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';

const { width } = Dimensions.get('window');

/**
 * LocationPickerWeb component - Web compatible version without react-native-maps
 * @param {string} label - Location picker label
 * @param {object} location - Location object with latitude and longitude
 * @param {function} onLocationSelected - Function to call when location is selected
 * @param {boolean} required - If the field is required
 */
const LocationPickerWeb = ({ 
  label, 
  location, 
  onLocationSelected,
  required = false 
}) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [manualLat, setManualLat] = useState(location ? location.latitude.toString() : '');
  const [manualLng, setManualLng] = useState(location ? location.longitude.toString() : '');
  
  useEffect(() => {
    // If location is provided
    if (location) {      
      // Set manual fields
      setManualLat(location.latitude.toString());
      setManualLng(location.longitude.toString());
      
      // Reverse geocode to get address
      fetchAddressFromCoordinates(location.latitude, location.longitude);
    }
  }, [location]);
  
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `${GEOCODING_API_URL}/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        setAddress(data.features[0].place_name);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetCurrentLocation = async () => {
    try {
      setLoading(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          translations.locationPermission,
          translations.locationPermissionDenied
        );
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const { latitude, longitude } = location.coords;
      
      // Update manual inputs
      setManualLat(latitude.toString());
      setManualLng(longitude.toString());
      
      onLocationSelected({ latitude, longitude });
      
      fetchAddressFromCoordinates(latitude, longitude);
      
    } catch (error) {
      Alert.alert(
        translations.error,
        translations.unableToGetLocation
      );
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleManualCoordinates = () => {
    const latitude = parseFloat(manualLat);
    const longitude = parseFloat(manualLng);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert(
        translations.error,
        'Please enter valid coordinates'
      );
      return;
    }
    
    onLocationSelected({
      latitude,
      longitude,
    });
    
    fetchAddressFromCoordinates(latitude, longitude);
  };
  
  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };
  
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.requiredStar}>*</Text>}
        </View>
      )}
      
      <View style={styles.locationContainer}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={toggleMap}
        >
          <Feather name="map-pin" size={20} color={COLORS.primary} />
          <Text style={styles.locationText}>
            {address 
              ? address 
              : location 
                ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` 
                : translations.selectLocationOnMap}
          </Text>
          <Feather
            name={mapVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color={COLORS.grey}
          />
        </TouchableOpacity>
        
        {loading && (
          <ActivityIndicator 
            style={styles.loader} 
            size="small" 
            color={COLORS.primary} 
          />
        )}
      </View>
      
      {mapVisible && (
        <View style={styles.webInputContainer}>
          <View style={styles.webInputRow}>
            <View style={styles.webInputWrapper}>
              <Text style={styles.webInputLabel}>Latitude</Text>
              <TextInput
                style={styles.webInput}
                value={manualLat}
                onChangeText={setManualLat}
                keyboardType="numeric"
                placeholder="41.40338"
              />
            </View>
            <View style={styles.webInputWrapper}>
              <Text style={styles.webInputLabel}>Longitude</Text>
              <TextInput
                style={styles.webInput}
                value={manualLng}
                onChangeText={setManualLng}
                keyboardType="numeric"
                placeholder="2.17403"
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.webButton}
            onPress={handleManualCoordinates}
          >
            <Feather name="map-pin" size={16} color="#FFF" />
            <Text style={styles.webButtonText}>Set Location</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.webButton, styles.webSecondaryButton]}
            onPress={handleGetCurrentLocation}
          >
            <Feather name="navigation" size={16} color={COLORS.primary} />
            <Text style={styles.webSecondaryButtonText}>Use Current Location</Text>
          </TouchableOpacity>
          
          {address ? (
            <View style={styles.webAddressContainer}>
              <Text style={styles.webAddressLabel}>Address:</Text>
              <Text style={styles.webAddressText}>{address}</Text>
            </View>
          ) : null}
        </View>
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
  locationContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.dark,
    marginLeft: 10,
  },
  loader: {
    marginRight: 16,
  },
  webInputContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.white,
  },
  webInputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  webInputWrapper: {
    flex: 1,
    marginRight: 8,
  },
  webInputLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  webInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: COLORS.dark,
  },
  webButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  webButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 8,
  },
  webSecondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  webSecondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  webAddressContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },
  webAddressLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  webAddressText: {
    fontSize: 14,
    color: COLORS.dark,
  },
});

export default LocationPickerWeb;