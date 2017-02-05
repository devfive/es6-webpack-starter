const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config/config');
const exclude = /node_modules/;

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index',
    `webpack-dev-server/client?http://localhost:${config.ports.frontend}`,
  ],
  output: {
    filename: 'app.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new HtmlWebpackPlugin({
      template: `html-loader!preprocess-loader!src/index.html`,
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.join(__dirname, 'src')],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'autoprefixer-loader',
          'sass-loader',
        ],
        exclude,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        exclude,
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
        exclude
      },
    ],
  },
  devServer: {
    contentBase: './src',
    port: config.ports.frontend,
  },
};
