var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    historyApiFallback: true,
    port: 8000,
    host: '0.0.0.0',
    hot: false
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500
  }
});
