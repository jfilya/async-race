const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
      rules: [
          {
              test:/\.css$/,
              use:[{
                loader:MiniCssExtractPlugin.loader,
                options: {}
              },'css-loader']
          },
          {
              test:/\.s[ac]ss$/,
              use:[{
                  loader:MiniCssExtractPlugin.loader,
                  options: {}
              },'css-loader','sass-loader']
          },
          {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
          },
      ],
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          filename: 'index.html',
      }),
      new EslintPlugin({
          extensions: 'ts',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
  ],
};
