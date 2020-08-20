const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
devConfig =  {
  devServer: {
    contentBase: path.join(__dirname, "../bin"),
    compress: true,
    port: 5060
  },
 
}
module.exports =merge(devConfig,baseConfig)