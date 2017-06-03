const webpack           = require('webpack');
const path              = require('path');
const { resolve }       = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin   = require('webpack-dashboard/plugin');
const DllBundlesPlugin  = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'src'),
    images: path.join(__dirname, 'src/assets/'),
    build: path.join(__dirname, 'dist')
};

const options = {
    host: 'localhost',
    port: '8282'
};

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './src/index.js',
        main: './src/components/system/index.js'
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      host: options.host,
      port: options.port 
    },

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    },

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: PATHS.build
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
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
        //new UglifyJSPlugin(),
        new ExtractTextPlugin('style.css'),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'index',
        //     filename: 'index-[hash].min.js'
        // }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            filename: 'main-[hash].min.js'
        }),

        new DashboardPlugin(),

        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'components/system/main.html'),
            inject: 'body'
        }),

        new OpenBrowserPlugin({
            url: `http://${options.host}:${options.port}`
        })
    ]
};
