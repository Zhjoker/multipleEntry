let htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let { getEntry, getHtmlTemplate } = require('./utils');
let path = require('path');
let htmlPluings = getHtmlTemplate();
module.exports = {
  resolve: {
    alias: {
      "@src": path.resolve("src"),
    },
  },
  entry: () => {
    let entryList = getEntry();
    return entryList;
  },
  output: {
    publicPath:'/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/bundle.[contenthash].js',
  },
  plugins: [
    ...htmlPluings,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('./static/'),	// 原始目录
          to: '../dist/static',	// 输出目录
        }
      ],
      options: {
        concurrency: 100,
      },
    }),
    new miniCssExtractPlugin({
      filename: '[name]/[hash].css',
      
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html|htm)$/i,
        use: 'html-img-loader', // 解析 html中的图片资源
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          

          },
          miniCssExtractPlugin.loader,
          { loader: "css-loader" },

        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: './assets/img/[name][hash:7].[ext]'
            }
          },

        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|txt)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(txt)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'assets/txt/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        common: {
          test: /.js$/,
          name: 'common',
          chunks: 'initial',
          priority: 1,
          minChunks: 2
        }
      }
    }
  }
}