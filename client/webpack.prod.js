var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var CopyPlugin = require('copy-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var API_LINK = process.env.API_LINK;

module.exports = merge(common, {
  mode: 'production',
  watch: false,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname , 'build'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
    })],
  },
  plugins: [
    new CopyPlugin([{ from: 'src/index.html', to: '', toType: 'dir' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_LINK: JSON.stringify(API_LINK),
      },
    }),
  ],
});
