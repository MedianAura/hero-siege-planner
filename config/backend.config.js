const path = require('path');
const webpack = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
const config = require('./default.config');

const c = {
  entry: path.resolve(__dirname, '../src/backend/main.ts'),
  output: {
    path: path.resolve(__dirname, '../.out/backend'),
    filename: '[name].js',
  },
};

module.exports = (env, argv) => {
  Object.assign(config, c);

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(argv.mode === 'production' ? 'PROD' : 'DEV'),
        BASE_URL: '"./"',
      },
    }),
  );

  config.optimization.minimize = argv.mode === 'production';

  return config;
};
