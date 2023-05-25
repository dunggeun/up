const process = require('node:process');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: process.cwd(),
  entry: { sw: './service-worker.ts' },
  output: {
    path: './dist',
    publicPath: '/',
  },
};
