const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',

	entry: {
		dev: path.resolve(__dirname, 'src/assets/javascript/utils/dev.js'),
	},

	devtool: 'inline-source-map',

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
});
