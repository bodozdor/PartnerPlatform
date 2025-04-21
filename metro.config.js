// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Dodajemo App.web.js kao ulaznu točku za web platformu
config.resolver.resolverMainFields = ['browser', 'main'];
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'web.js', 'web.jsx', 'web.ts', 'web.tsx'];

module.exports = config;