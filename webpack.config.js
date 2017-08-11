var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractPlugin = new ExtractTextPlugin('../css/main.bundle.css');

module.exports = {
    context: __dirname + "/js",
    entry: "./app.js",
    output: {
        path: __dirname + "/js",
        filename: "app-bundle.js"
    },
    module: {
    	rules: [
    		{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
    		},
    		{
    			test: /\.sass$/,
    			use: extractPlugin.extract({
    				use: ['css-loader', 'sass-loader']
    			})
    				
    		},
    		{
    			test: /\.(jpg|png|gif)$/,
    			use: [
    				{
    					loader: 'file-loader',
    					options: {
    						name: '[name].[ext]',
    						outputPath: '../img/',
    						publicPath: '../img/'
    					}
    				}
    			]
    		},
    		{
    			test: /\.svg$/,
    			use: [
    				{
    					loader: 'file-loader',
    					options: {
    						name: '[name].[ext]',
    						outputPath: '../svg/',
    						publicPath: '../svg/'
    					}
    				}
    			]
    		}

    	]
    },
    plugins: [
    	extractPlugin
    ]
};