const { resolve }       = require('path');
const path              = require('path');
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkgInfo           = require('./package.json')
const url               = require('url')
const DashboardPlugin   = require('webpack-dashboard/plugin');
const DllBundlesPlugin  = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const options = {
//     host: 'localhost',
//     port: '8282'
// };

var TARGET = process.env.npm_lifecycle_event; 

module.exports = (options = {}) => {
  const config = require('./config/webpack.' + (process.env.npm_config_config || options.config || 'default'))
  const PATHS = {
      app: path.join(__dirname, 'src'),
      images: path.join(__dirname, 'src/assets/'),
      build: path.join(__dirname, 'dist/')
  };

  return {
    entry: {
      // vendor: './src/components/vendors',
      main: './src/components/system/index.js'
    },

    output: {
      path: resolve(__dirname, 'dist'),
      chunkFilename: '[id].js?[chunkhash]',
      filename: options.dev ? '[name].js' : '[name]-[hash].js'
      //publicPath: PATHS.build
    },

    devServer: config.devServer ? {
      host: config.devServer.host,
      port: config.devServer.port,
      proxy: config.devServer.proxy,
      historyApiFallback: {
        index: url.parse(config.publicPath).pathname,
        disableDotRule: true
      }
    } : undefined,

    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: ['babel-loader', 'eslint-loader'],
        //   //loader: 'babel-loader',
        //   options: {
        //       presets: ['es2015']
        //   } ,
        //   options: {
        //     formatter: require('eslint-friendly-formatter')
        //   }
        // },
        // 
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                root: resolve(__dirname, 'src'),
                attrs: ['img:src', 'link:href']
              }
            }
          ]
        },
        // {
        //     test: /\.html$/,
        //     use: 'html-loader'
        // },

        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //       use: [{
        //           loader: 'css-loader',
        //           options: {
        //               sourceMap: true
        //           }
        //       }],
        //       fallback: 'style-loader'
        //   })

        // },
        
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },

        {
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // new webpack.ProvidePlugin({
      //     '_': 'underscore',
      //     $: 'jquery',
      //     jQuery: 'jquery',
      //     'window.jQuery': 'jquery'
      // }),

      // new ExtractTextPlugin('style.css'),

      new webpack.HotModuleReplacementPlugin({
          multiStep: true
      }),

      new HtmlWebpackPlugin({
          template: path.join(PATHS.app, 'components/system/main.html'),
          inject: 'body'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['main']
      }),

      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig)
      })
    ],

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    }
    ,

    performance: {
      hints: options.dev ? false : 'warning'
    }
  }
}
// new DashboardPlugin(),

// new OpenBrowserPlugin({
//     url: `http://${config.devServer.host}:${config.devServer.port}`
// }),
console.log(`============== ${process.env.npm_lifecycle_event} =============`)
if(TARGET === 'dev' || !TARGET) {
  // console.log(`============== Append Dashboadr Plugin. =============`)
  // module.exports.plugins.push(new DashboardPlugin());
  // module.exports.plugins.push(
  //   new OpenBrowserPlugin({
  //     url: `http://${config.devServer.host}:${config.devServer.port}`
  //   })
  // );
}

if(TARGET === 'build') {

}