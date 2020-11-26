const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'node',
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              esModule: false,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
              esModule: false,
            },
          },
        ],
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            },
          },
        ],
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      /* config.module.rule('js') */
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'less-loader', 'css-loader'],
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@core': path.resolve(__dirname, './src/core'),
      '@backend': path.resolve(__dirname, './src/backend'),
      '@frontend': path.resolve(__dirname, './src/frontend'),
      '@root': path.resolve(__dirname, '.'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
  devtool: 'cheap-module-source-map',
  externals: [nodeExternals()],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 20,
      minSize: 100000,
      cacheGroups: {
        vendor: {
          test: /[/\\]node_modules[/\\]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vendor-${packageName.replace('@', '')}`;
          },
        },
      },
    },
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
  stats: {
    all: false,
    env: true,
    outputPath: true,
    publicPath: true,
    assets: true,
    entrypoints: true,
    chunkGroups: true,
    chunks: true,
    modules: true,
    warnings: true,
    errors: true,
    errorDetails: true,
    errorStack: true,
    moduleTrace: true,
    builtAt: true,
    errorsCount: true,
    warningsCount: true,
    timings: true,
    version: true,
    hash: true,
  },
  plugins: [new VueLoaderPlugin(), new ESBuildPlugin(), new CaseSensitivePathsPlugin(), new FriendlyErrorsWebpackPlugin()],
};
