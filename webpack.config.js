const path = require('path');
const glob = require('glob');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, 'src'),
};

const PAGES = fs
	.readdirSync(path.resolve(__dirname, './src/views/'))
	.filter((fileName) => fileName.endsWith('.hbs'));

const PARTIALS = fs
	.readdirSync(path.resolve(__dirname, './src/components/'))
	.filter(
		(fileName) => !fileName.endsWith('.hbs') && !fileName.endsWith('.scss')
	);

const UI_PARTIALS = fs
	.readdirSync(path.resolve(__dirname, './src/components/_ui'))
	.filter(
		(fileName) => !fileName.endsWith('.hbs') && !fileName.endsWith('.scss')
	);

module.exports = (env) => {
	const isDev = env.mode === 'development';

	return {
		mode: env.mode ?? 'development',

		entry: {
			app: path.resolve(__dirname, 'src/index.js'),
			sprite: path.resolve(__dirname, 'src/assets/javascript/global/sprite.js'),

			/* animation: path.resolve(__dirname, "src/animation.js"), */
		},

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: './assets/javascript/[name].[contenthash].js',
			clean: true,
		},

		devtool: isDev ? 'inline-source-map' : false,
		devServer: isDev
			? {
					static: {
						directory: path.join(__dirname, 'src'),
					},
					port: 3000,
					open: true,
					hot: true,
					compress: true,
					historyApiFallback: true,
				}
			: undefined,

		module: {
			rules: [
				{
					test: /\.hbs$/i,
					loader: 'handlebars-loader',
					options: {
						/* helperDirs: [path.join(__dirname, "src", "helpers")], */
						partialDirs: [
							path.join(__dirname, 'src', 'components'),
							...PARTIALS.map((component) =>
								path.join(__dirname, 'src', 'components', component)
							),
							...UI_PARTIALS.map((component) =>
								path.join(__dirname, 'src', 'components', '_ui', component)
							),
							path.join(__dirname, 'src', 'views', 'layouts'),
						],
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										[
											'autoprefixer',
											{
												// Options
											},
											'css-has-pseudo',
											{
												// Options
											},
										],
									],
								},
							},
						},
						'sass-loader',
					],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'assets/fonts/[name][ext]',
					},
				},
				{
					test: /\.(png|jpg|jpeg|gif|webp)$/i,
					type: 'asset',
					generator: {
						filename: 'assets/images/[name][ext]',
					},
				},
				{
					test: /\.svg$/,
					use: {
						loader: 'svg-sprite-loader',
						/* 		options: {
							extract: true,
						}, */
					},
				},
			],
		},

		optimization: {
			minimizer: [
				'...',
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							// Lossless optimization with custom option
							// Feel free to experiment with options for better result for you
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
			],

			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},

		plugins: [
			new CopyPlugin({
				patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
			}),
			/*       new HtmlWebpackPlugin({
        title: "Webpack Template",
        filename: "index.html",
        template: "src/template.html",
        favicon: "src/assets/public/favicon.ico",
      }), */

			isDev
				? false
				: new MiniCssExtractPlugin({
						filename: 'assets/styles/[name].[contenthash].css',
					}),

			new PurgeCSSPlugin({
				paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
				keyframes: true,
				fontFace: true,
				variables: true,
			}),

			...PAGES.map(
				(page) =>
					new HtmlWebpackPlugin({
						inject: 'body',
						minify: false,
						template: path.resolve(__dirname, `./src/views/${page}`),
						filename: `${page.replace(/\.hbs/, '.html')}`,
					})
			),
		],
	};
};
