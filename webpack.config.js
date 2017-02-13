const path = require('path'),
webpack = require('webpack'),
poststylus = require('poststylus'),
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + "/app",
  entry: ['babel-polyfill','./app.jsx'],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: {
    // Tell webpack to look for required files in node
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', '.styl']
  },
  module: {
    // npParse === aframe Bugfix for console warning
    noParse: [
      /node_modules\/aframe\/dist\/aframe-master.js/, // for aframe from NPM
      /node_modules\/cannon\/build\/cannon.js/, // for aframe-extras from NPM
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        }

      },{
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },{ test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  stylus: {
    use: [
      poststylus([ 'autoprefixer'])
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'A-Frame Curverimge Calculator',
      template: __dirname + '/app/index.html',
      inject: 'body',
      files: {
        'css': [ __dirname + '/app/style.styl']
      }
    })
  ]
};
