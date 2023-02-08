// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prefer-named-capture-group */
const path = require('node:path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const { presets, plugins } = require('./babel.config.js');
const { transformIgnorePackages } = require('./shares');

const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js|jsx)$/i,
  include: [
    path.resolve(__dirname, 'index.web.js'),
    path.resolve(__dirname, 'App.tsx'),
    path.resolve(__dirname, 'src'),
    new RegExp(transformIgnorePackages.join('|'))
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'file-loader',
    },
  ],
};

const svgLoaderConfiguration = {
  test: /\\\\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

module.exports = {
  devtool: process.env.NODE_ENV === 'development'
    ? 'inline-nosources-cheap-source-map'
    : false,
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      '@/App': './App',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      favicon: path.join(__dirname, 'static/icons/favicon.ico'),
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, 'static/icons/logo.png'),
      manifest: path.join(__dirname, 'static/site.webmanifest'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
  ],
};
