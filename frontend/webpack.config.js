var path = require('path')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	entry: {},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].js',
	},
	plugins: [
		new CompressionPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
			test: /\.(js|css|html|svg)$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	],
}
