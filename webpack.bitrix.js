require('dotenv').config()
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/javascript/[name].js',
        clean: true,
    },

    module: {
        rules: common.module.rules.splice(0, 1),
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 'auto',
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: './assets/styles/[name].css',
        }),
		new BrowserSyncPlugin({
            proxy: `http://localhost:${process.env.PORT_PROXY}`,
            serveStatic: ['.'],
            files: [
                '../../../**/*.php',
                //'../../../**/*.js',
                //'../../../**/*.scss',
            ]
        }),
    ]
});
