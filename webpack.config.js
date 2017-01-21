'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        app: './home'
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
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ]
};