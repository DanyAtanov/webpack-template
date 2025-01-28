const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PAGES = fs
	.readdirSync(path.resolve(__dirname, './src/views/'))
	.filter((fileName) => fileName.endsWith('.html'));

const PARTIALS = fs
	.readdirSync(path.resolve(__dirname, './src/components/'))
	.filter(
		(fileName) => !fileName.endsWith('.html') && !fileName.endsWith('.scss')
	);

const UI_PARTIALS = fs
	.readdirSync(path.resolve(__dirname, './src/components/_ui'))
	.filter(
		(fileName) => !fileName.endsWith('.html') && !fileName.endsWith('.scss')
	);

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
		'main-page': path.resolve(__dirname, 'src/assets/javascript/main-page.js'),
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './assets/javascript/[name].[contenthash].js',
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'handlebars-loader',
				options: {
					extensions: '.html',
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
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
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
									],
								],
							},
						},
					},
					{
						loader: 'resolve-url-loader',
						options: { removeCR: true },
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true, // <-- !!IMPORTANT!!
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				type: 'javascript/esm',
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
					filename: './assets/fonts/[name][ext]',
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
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							plainSprite: true,
							publicPath: '/assets/images/',
							//spriteFileName: 'sprite.svg'
						},
					},
					'svgo-loader',
				],
			},
		],
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/assets/images', to: 'assets/images' },
				{ from: 'robots.txt' },
			],
		}),
		new MiniCssExtractPlugin({
			filename: './assets/styles/[name].[contenthash].css',
		}),
		new SpriteLoaderPlugin(),
		...PAGES.map(
			(page) =>
				new HtmlWebpackPlugin({
					inject: 'head',
					title: `${page.replace(/\.html/, '')}`,
					template: path.resolve(__dirname, `./src/views/${page}`),
					filename: `${page}`,
					chunks: ['app', `${page.replace(/\.html/, '')}`],
				})
		),
	],
};
