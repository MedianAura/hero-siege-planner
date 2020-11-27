const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const config = require('./default.config');

const c = {
  target: 'web',
  entry: path.resolve(__dirname, '../src/frontend/main.ts'),
  output: {
    path: path.resolve(__dirname, '../.out/frontend'),
    publicPath: '/',
    filename: '[name].js',
  },
  externals: [],
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

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      templateParameters: {
        BASE_URL: './',
      },
      filename: 'index.html',
    }),
  );

  config.optimization.minimize = argv.mode === 'production';

  return config;
};
