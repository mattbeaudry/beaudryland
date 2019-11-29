var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var path = require('path');

module.exports = {
    context: __dirname + "/source/",
    entry: "./app.js",
    output: {
        path: __dirname + "/build/js",
        filename: "app-bundle.js"
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '../css/main.bundle.css'
		}),
		new webpack.ProvidePlugin({
    		$: 'jquery',
    		jQuery: 'jquery',
            'globals': 'globals'
    	})
    ],
    module: {
    	rules: [
    		{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'react']
						}
					}
				]
    		},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							name: '[name].bundle.css',
							outputPath: 'build/css',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'css-loader'
					},
					{ 
						loader: 'sass-loader'

					}
				],
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
    resolve: {
        alias: {
            'globals': path.resolve(__dirname, './globals'),
            "jquery-ui": "jquery-ui/jquery-ui.js",      
            modules: path.join(__dirname, "node_modules"),
        }
    }
};