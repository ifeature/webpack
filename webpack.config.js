'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname, './frontend'),
    entry: {
        home: ['babel-polyfill', './home'],
        about: ['babel-polyfill', './about'],
        common: ['./welcome', './common']
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: './',
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'this'
    },
    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
        poll: 1000,
        ignored: /node_modules/
    },
    devtool: NODE_ENV ? 'cheap-inline-source-map' : 'source-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json']
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2,
            chunks: ['about', 'home']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common-goods',
            chunks: ['shop', 'order']
        })
    ]
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}