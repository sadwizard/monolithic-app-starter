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


const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-object-rest-spread', { 'loose': true, 'useBuiltIns': true }],
      '@babel/plugin-transform-async-to-generator'
    ],
  }
};

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
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [ babelLoader, 'react-prefix-loader' ]
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
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('postcss-filename-prefix')()]
              }
            },
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
              presets: ['@babel/preset-env', '@babel/preset-react']
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
