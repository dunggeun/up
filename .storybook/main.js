const transformIgnorePackages = require('../shares').transformIgnorePackages;

const fixedBabelLoaderRule =  {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: new RegExp(`node_modules/(?!${transformIgnorePackages.join('|')})`),
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
};

module.exports = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
  ],
  framework: '@storybook/react',
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.loader === 'babel-loader') {
        return fixedBabelLoaderRule;
      } else {
        return rule;
      }
    });
    return config;
  },
};