const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Create a custom resolver for web platform
const { resolver } = defaultConfig;

// Add custom resolver configuration
defaultConfig.resolver = {
  ...resolver,
  // For web platform, resolve react-native-maps to our empty implementation
  resolveRequest: (context, moduleName, platform) => {
    // Replace react-native-maps with empty module on web platform
    if (platform === 'web' && moduleName.includes('react-native-maps')) {
      return {
        filePath: path.resolve(__dirname, './src/components/common/react-native-maps-web.js'),
        type: 'sourceFile',
      };
    }
    
    // Use the default resolver for all other cases
    return resolver.resolveRequest(context, moduleName, platform);
  },
};

module.exports = defaultConfig;
