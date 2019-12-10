
// const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    module: {
        rules:[{
            test: /\.(png\jpg\gif\svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: '/',
                outputPath: "assets/fonts/"
            }
        },{
            test:/\.css$/,
            use:[
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader'},
                {loader: 'postcss-loader',
                    options:{config:{
                                path:'src/js/postcss.config.js'
                    }}
                }
            ]
        },
        {
            test:/\.scss$/,
            use: [
                {loader: 'style-loader'},
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { 
                        // sourceMap: true,
                        url: false }
                },
                {
                    loader: 'sass-loader',
                    options: { 
                        // sourceMap: true 
                    }
                },
                {loader: 'postcss-loader',
                    options:{config:{
                                path:'src/js/postcss.config.js'
                    }}
                }
            ]
        }
    ]},
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 8081,
        overlay: true
    },
    plugins: [
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[file].map'
        // }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.html',
            filename: './index.html'
        }),
        new copyWebpackPlugin([
            { from: './src/img', to: './assets/img' },
            { from: './src/style/fonts', to: './assets/fonts' }
        ])
    ]
}