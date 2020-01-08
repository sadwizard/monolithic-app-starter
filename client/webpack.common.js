const path = require('path');
const _ = require('lodash'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const envVariables = _.reduce([
    'NODE_ENV',
    'API_LINK',
    'SUPPORT_EMAIL',
    'VK_API_KEY',
    'VK_REDIRECT_URI',
    'VK_API_VERSION'
  ],
  (result, key) => {
    result[key] = JSON.stringify(process.env[key]);
    return result;
}, {});

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname , 'src'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2015']
          }
        }
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { minimize: process.env.NODE_ENV === 'production' ? true : false }
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 0,
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            limit: 0,
            outputPath: 'images'
          }
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['env', 'react', 'es2015']
            }
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': envVariables,
    }),
  ]
};