
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
entry: './src/pages/index.js',
output: {
filename: 'main.js',
path: path.resolve(__dirname, 'dist'),
},
module: {
rules: [
{
test: /.js$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader',
},
},
{
test: /.css$/,
use: [
MiniCssExtractPlugin.loader,
'css-loader',
'postcss-loader',
],
},
{
test: /.(png|jpe?g|gif|svg)$/i,
type: 'asset/resource',
generator: {
filename: 'images/[name].[ext]',
},
},
{
test: /.(woff|woff2|eot|ttf|otf)$/i,
type: 'asset/resource',
generator: {
filename: 'fonts/[name].[ext]',
},
},
],
},
plugins: [
new HtmlWebpackPlugin({
template: './src/index.html',
filename: 'index.html',
}),
new MiniCssExtractPlugin({
filename: 'main.css',
}),
],
devServer: {
static: {
directory: path.resolve(__dirname, 'mesto', 'src'),
},
compress: true,
port: 8080,
},
};