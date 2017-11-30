var webpack = require("webpack"),
    path = require('path');

const ccpOptions = {
    name: 'vendor',
    filename: './dist/vendor.bundle.js'
};

const options = {
    host: 'localhost',
    port: '8282'
};

const PATHS = {
  app: path.join(__dirname, 'src'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};

function root(__path) {
    return path.join(__dirname, __path);
}

module.exports = {
    entry: {
        "vendor": "./src/vendor",
        "app": "./src/app"
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: options.host,
        port: options.port
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.ts/,
                loader: 'ts-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },{
                test: /\.(js|jsx)$/,
                //exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }, {
                test: /\.(css|less)$/,
                loaders: ['style', 'css', 'less'],
                include: PATHS.app
            },{
                test: /\.less$/,
                loader: 'style!css!less'
              }, {
                test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                query: {
                    name: '[path][name].[ext]'
                }
            }

        ]
    },


    plugins: [
        new webpack.optimize.CommonsChunkPlugin(ccpOptions),

        // Takes care of warnings described at https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src'), // location of your src
            {}
        ),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        }),

        new webpack.HotModuleReplacementPlugin()
    ]
}
