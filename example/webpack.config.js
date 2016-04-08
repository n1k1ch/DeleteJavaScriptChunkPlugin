var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DeleteJavaScriptChunkPlugin = require('./../');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'app': './src/app.js',
        'non-ie': './src/css/non-ie.scss'
    },

    output: {
        path: './bundle',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            }
        ],
        noParse: [
            '/modernizr\.js$/'
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new DeleteJavaScriptChunkPlugin({extensions: 'scss'})
    ],
    postcss: [autoprefixer],
    devServer: {
        inline: true,
        contentBase: './',
        port: 5555
        //,compress:true
    },
};