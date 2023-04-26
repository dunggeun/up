const transformIgnorePackages = require('../shares').transformIgnorePackages;

const fixedBabelLoaderRule = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: new RegExp(`node_modules/(?!${transformIgnorePackages.join('|')})`),
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
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
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.loader === 'babel-loader') {
        return fixedBabelLoaderRule;
      } else {
        return rule;
      }
    });

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
};
