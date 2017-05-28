import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import webpack from 'webpack';

/*
 This was largely based off this tutorial:
 https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783

 Seems like relatively sane defaults as a starting point :)
*/

const config = {
  // Sets the default path where
  context: path.resolve(__dirname, './js'),
  entry: {
    app: './script.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sass|scss)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ], // The order of use is backwards - so sass-loader is used first
      },
      {
        test: /\.(woff2?|ttf|eot|jpe?g|png|gif|svg)$/,
        loader: 'file-loader?name=../[path]/../[name].[ext]',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },
  watch: true,
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:8080/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      files: ['./html/*.html'],
      server: {
        baseDir: ['html'],
      },
    }),
  ],
};

module.exports = config;
