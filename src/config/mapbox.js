// Mapbox access token
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN || 'your-mapbox-access-token';

// Mapbox style URL
export const MAPBOX_STYLE_URL = 'mapbox://styles/mapbox/streets-v11';

// Default region (Croatia center)
export const DEFAULT_REGION = {
  latitude: 45.1,
  longitude: 15.2,
  latitudeDelta: 3.0,
  longitudeDelta: 3.0,
};

// Geocoding API base URL
export const GEOCODING_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

// Reverse geocoding API base URL
export const REVERSE_GEOCODING_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
