/* eslint-disable prefer-named-capture-group */
const path = require('node:path');
const { presets, plugins } = require('./babel.config.js');
const { transformPackagesOnRspack } = require('./shares');

const babelLoaderConfiguration = {
  test: /\.(ts|tsx|js|jsx)$/i,
  include: [new RegExp(`(${transformPackagesOnRspack.join('|')})`)],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};

const jsModuleConfiguration = {
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
};

const imageLoaderConfiguration = {
  test: /\.(png|jpe?g|gif)$/i,
  type: 'asset',
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
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  devServer: {
    allowedHosts: 'all',
  },
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
      'react-native': 'react-native-web',
      'react-native-share': './dummy',
      '@/App': './App',
      src: './src',
      tests: './tests',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      jsModuleConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  builtins: {
    html: [
      {
        template: './index.html',
        favicon: './static/icons/favicon.ico',
        publicPath: '',
        minify: true,
      },
    ],
    copy: {
      patterns: ['./static/icons/logo.png', './static/site.webmanifest'],
    },
    define: {
      __DEV__: JSON.stringify(true),
      process: {
        env: {},
      },
    },
  },
  optimization: {
    sideEffects: false,
    moduleIds: 'named',
    minimize: false,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'index.html'),
  //     favicon: path.join(__dirname, 'static/icons/favicon.ico'),
  //   }),
  //   new FaviconsWebpackPlugin({
  //     logo: path.join(__dirname, 'static/icons/logo.png'),
  //     manifest: path.join(__dirname, 'static/site.webmanifest'),
  //   }),
  // ],
};
