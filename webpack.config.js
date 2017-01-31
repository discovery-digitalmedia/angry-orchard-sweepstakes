var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var PathRewriterPlugin = require('webpack-path-rewriter');

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";

const entry = PRODUCTION
	?	[
			'babel-polyfill',
			'./src/app.js'
		]
	:	[
			'./src/app.js',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

const plugins = PRODUCTION
	? 	[
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
          {from:'./src/img', to:'img'},
          {from:'./src/video', to:'video'},

        ]),
        new ExtractTextPlugin("app.css")
		]
	: 	[
			 new webpack.HotModuleReplacementPlugin()
		];

plugins.push(
	new webpack.DefinePlugin({
		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
		PRODUCTION: JSON.stringify(PRODUCTION)
	})
);

module.exports = {
  entry: entry,
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js'],
    alias: {
      'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'ScrollToPlugin': path.resolve('node_modules', 'gsap/src/uncompressed/plugins/ScrollToPlugin.js'),
			'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
	  }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: "bundle.js"
  } ,
  plugins: plugins,
  module: {
    loaders: [
      {
          test: /\.js$/,
          loaders: ["babel-loader"],
          exclude: "/node_modules/"
      },
      {
          test: /\.(png|jpg|gif)$/,
          loader: PRODUCTION ? 'file?emitFile=false&name=img/[name].[ext]' : ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
          exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: PRODUCTION ? ExtractTextPlugin.extract("style-loader", "css-loader") : 'style-loader!css-loader?localIdentName=[path][name]---[local]',
        exclude: "/node_modules/"
      }
      // {
      //   test: /[.]html$/,
      //   loader: PathRewriterPlugin.rewriteAndEmit({
      //     name: '[name].html'
      //   })
      // }

    ]
  }
};
