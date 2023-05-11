const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'assets'),
      publicPath: '/assets',
    },
    compress: true,
    port: 9000,
  },
  devtool: 'eval-source-map',
  plugins: [ new HtmlWebpackPlugin() ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ],
      },
      {
        test: /\.jsx$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: [ '.js', '.jsx' ],
        },
      },
    ],
  },
};
