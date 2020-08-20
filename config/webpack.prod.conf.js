
const { merge }= require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const prodConfig = {  
  plugins:[
    new CleanWebpackPlugin(),
    
  ],

}

module.exports =merge(baseConfig,prodConfig)
