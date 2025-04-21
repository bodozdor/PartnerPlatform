import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { MAPBOX_ACCESS_TOKEN, DEFAULT_REGION, GEOCODING_API_URL } from '../../config/supabase';
import { COLORS } from '../../styles/colors';
import { translations } from '../../utils/translations';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

/**
 * LocationPicker component
 * @param {string} label - Location picker label
 * @param {object} location - Location object with latitude and longitude
 * @param {function} onLocationSelected - Function to call when location is selected
 * @param {boolean} required - If the field is required
 */
const LocationPicker = ({ 
  label, 
  location, 
  onLocationSelected,
  required = false 
}) => {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  
  useEffect(() => {
    // If location is provided, update the map region
    if (location) {
      setRegion({
        ...region,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      
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
      
      setRegion({
        ...region,
        latitude,
        longitude,
      });
      
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
  
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    
    setRegion({
      ...region,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    
    onLocationSelected({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    
    fetchAddressFromCoordinates(coordinate.latitude, coordinate.longitude);
  };
  
  const toggleMap = () => {
    setMapVisible(!mapVisible);
  };
  
  // Native-specific implementation

  // Render map content - native only implementation
  const renderMapContent = () => {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}
        </MapView>
        
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleGetCurrentLocation}
        >
          <Feather name="navigation" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
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
      
      {mapVisible && renderMapContent()}
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
  mapContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  // Native-specific error styling
  mapError: {
    marginTop: 8,
    padding: 20,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapErrorText: {
    fontSize: 14,
    color: COLORS.dark,
    textAlign: 'center',
  },
});

export default LocationPicker;
