module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            assets: './assets',
            components: './src/components',
            screens: './src/screens',
            navigations: './src/navigations',
            styles: './src/styles',
            types: './src/types',
            constants: './src/constants'
          }
        }
      ]
    ]
  };
};
