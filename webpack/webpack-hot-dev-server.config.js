/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: 'http://localhost:2992/assets/',
    filename: "[name].js",
    chunkFilename: "[id].chunk.[hash].js",
    sourceMapFilename: "debugging/[file].map",
    pathinfo: true
  },

  cache: true,
  debug: true,
  devtool: 'eval',
  entry: {
    main: './app/main.jsx'
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  resolveLoader: { root: path.join(__dirname, "node_modules") },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel?experimental&optional=selfContained!jsx-loader?harmony'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(scss|sass)/,
        loader: 'css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loder?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader'
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(md|markdown)$/,
        loaders: ['html-loader', 'markdown-loader']
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  devServer: {
    stats: {
      exclude: [
        /node_modules[\\\/]react(-router)?[\\\/]/
      ]
    }
  }

};
