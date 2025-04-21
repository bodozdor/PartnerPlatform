export default {
  name: "partner-app",
  slug: "partner-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./generated-icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./generated-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./generated-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    bundler: "metro",
    favicon: "./generated-icon.png"
  },
  extra: {
    eas: {
      projectId: "partner-app"
    }
  }
};