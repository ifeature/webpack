'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        app: ['babel-polyfill', './home']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        library: 'home',
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
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ]
};