module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@config': './src/config',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@context': './src/context',
          },
        },
      ],
    ],
  };
};
