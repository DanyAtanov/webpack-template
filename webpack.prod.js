const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
//const glob = require('glob');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'src'),
};

module.exports = (env) =>
	merge(common, {
		mode: 'production',

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: env.noHash
				? './assets/javascript/[name].js'
				: './assets/javascript/[name].[contenthash].js',
			clean: true,
		},

		optimization: {
			minimize: true,
			minimizer: [
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							plugins: [
								['gifsicle', { interlaced: true }],
								['mozjpeg', { quality: 80, progressive: true }],
								['pngquant', { quality: [0.65, 0.8] }],
							],
						},
					},
				}),
				new ImageminWebpWebpackPlugin(),
				new CssMinimizerPlugin(),
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: false,
						},
					},
				}),
			],

			/* splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		}, */
		},

		plugins: [
			new CopyPlugin({
				patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
			}),

			//new PurgeCSSPlugin({
			//paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
			//keyframes: true,
			//fontFace: true,
			//variables: true,
			//}),
		],
	});
