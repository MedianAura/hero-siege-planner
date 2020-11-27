const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

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
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      /* config.module.rule('js') */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // modules: false,
            },
          },
        ],
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // modules: false,
            },
          },
          'sass-loader',
        ],
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // modules: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@core': path.resolve(__dirname, '../src/core'),
      '@backend': path.resolve(__dirname, '../src/backend'),
      '@frontend': path.resolve(__dirname, '../src/frontend'),
      '@root': path.resolve(__dirname, '..'),
      '@src': path.resolve(__dirname, '../src'),
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
  plugins: [new VueLoaderPlugin(), new CaseSensitivePathsPlugin(), new FriendlyErrorsWebpackPlugin()],
};
