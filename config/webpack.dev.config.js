const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const paths = require('./paths');

module.exports = merge.smart(baseConfig, {
  devServer: {
    hot: true,
    port: 4200,
    contentBase: paths.appOutput,
    publicPath: '/',
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
