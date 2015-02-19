/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  output: {
    path: path.join(__dirname, 'build', 'assets'),
    publicPath: '/assets/',
    filename: "[name].js",
    chunkFilename: "[id].chunk.[hash].js",
    sourceMapFilename: "debugging/[file].map",
    pathinfo: false
  },

  debug: false,
  devtool: false,
  entry: {
    main: './app/main.jsx'
  },

  stats: {
    colors: true,
    reasons: false
  },

  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
    function() {
      this.plugin("done", function(stats) {
        var jsonStats = stats.toJson({
          chunkModules: true,
          exclude: [
            /node_modules[\\\/]react(-router)?[\\\/]/
          ]
        });
        jsonStats.publicPath = '/assets/';
        require("fs").writeFileSync(path.join(__dirname, "build", "stats.json"), JSON.stringify(jsonStats));
      });
    },
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
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
