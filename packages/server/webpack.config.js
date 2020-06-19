const path = require('path');
const webpack = require('webpack');
const ReloadServerPlugin = require('reload-server-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackNodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

module.exports = {
  mode: "development",
  target: 'node',
  devtool: "inline-source-map",
  entry: {
    server: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".mjs"],
    plugins:[new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      whitelist: [/@approval/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: [/node_modules/],
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      }
    ]
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'index.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
};
