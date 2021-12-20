// const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const glob = require('glob')
//
// module.exports = {
//   entry: {
//     'bundle.js': glob
//       .sync('build/static/?(js|css)/main.*.?(js|css)')
//       .map((f) => path.resolve(__dirname, f)),
//   },
//   output: {
//     filename: 'build/static/js/bundle.min.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [new UglifyJsPlugin()],
// }

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'build/static/js'),
    filename: `bundle.min.js`,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};