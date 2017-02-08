'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname, './frontend'),
    entry: {
        home: ['babel-polyfill', './home'],
        about: ['babel-polyfill', './about'],
        common: ['./welcome', './common'],
        main: './main',
        base: './base.css'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
        chunkFilename: NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
        library: '[name]',
        libraryTarget: 'this'
    },
    externals: {
        lodash: '_'
    },
    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100,
        poll: 1000,
        ignored: /node_modules/
    },
    devtool: NODE_ENV ? 'cheap-inline-source-map' : 'source-map',
    resolve: {
        modules: [path.resolve(__dirname, './vendor'), 'node_modules'],
        extensions: ['.js', '.json'],
        alias: {
            old: 'old/dist/old'
        }
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js']
    },
    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.jade$/,
                use: ['jade-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!autoprefixer-loader?browsers=last 2 versions'
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!autoprefixer-loader?browsers=last 2 version!stylus-loader?resolve url'
                })
            },
            {
                test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
                include: /\/node_modules\//,
                loader: 'file-loader?name=[1][name].[hash:6].[ext]&regExp=node_modules/(.*)'
            },
            {
                test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
                exclude: /\/node_modules\//,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[hash:6].[ext]&limit=4096'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './frontend'),
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?jQuery!expose-loader?$'
            },
            {
                test: /old.js$/,
                exclude: /node_modules/,
                loader: 'expose-loader?Work!imports-loader?workSettings=>{delay:500}!exports-loader?Work',
                //loader: 'script'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            disable: false,
            allChunks: true,
            disable: NODE_ENV === 'development'
        }),
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.resolve(__dirname, './public/assets')
        }),
        new HtmlWebpackPlugin({
            filename: './about.html',
            chunks: ['common', 'about']
        }),
        new HtmlWebpackPlugin({
            filename: './menu.html',
            chunks: ['common', 'main']
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            // $: 'jQuery'
        }),
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
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        inline: true,
        hot: true,
        host: 'localhost',
        port: 9091,
        contentBase: path.resolve(__dirname, './backend'),
        historyApiFallback: true,
        proxy: {
          '*': 'http://localhost:3010'
        }
    }
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
