const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        app: './index.js',
        vendor: [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-material',
            'angular-google-chart',
            'lodash'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, './dist')
    },
    plugins: [
        new ExtractTextPlugin('app.bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity})
    ],
    module: {
        rules: [
            { test: /\.csv$/, use: 'dsv-loader'},
            { test: /\.html$/, use: 'file-loader?name=templates/[name].html' },
            { test: /\.(png|svg|jpg|gif|woff|woff2|ttf|eot|svg)$/, use: 'file-loader?name=assets/[name].[ext]' },
            { test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}) },
            { test: /\.scss$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"}) }
        ]
    }
};