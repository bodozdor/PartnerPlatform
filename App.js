import { Platform } from 'react-native';

// Choose which app implementation to load based on platform
// This completely isolates the native and web code to prevent import conflicts

// For web platform, we use an extremely simple app with absolutely no native dependencies
if (Platform.OS === 'web') {
  // No React Native dependencies that could cause problems
  const SimpleWebNotice = require('./src/SimpleWebNotice').default;
  module.exports = SimpleWebNotice;
} else {
  // Full native implementation for mobile platforms
  const NativeApp = require('./src/NativeApp').default;
  module.exports = NativeApp;
}
