const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Specify entry point
      entry: './index.web.js',
      // Other custom configurations can go here
    },
    argv
  );
  
  // Customize the config before returning it
  return config;
};