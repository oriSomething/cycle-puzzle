"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

const configDev = {
  entry: [
    "./src/main.css",
    "./src/main.js",
  ],
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "bundle.js",
  },
  module: {
    loaders: [{
      loader: "style!css!postcss",
      test: /\.css$/,
    }, {
      loader: "html",
      test: /\.html$/,
    }, {
      loader: "babel",
      test: /\.js$/,
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      currying: true,
      flattening: true,
      guards: true,
      memoizing: true,
      placeholders: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/main.ejs",
    }),
    new ExtractTextWebpackPlugin("bundle.css"),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devtool: "source-map",
  postcss(webpack) {
    return [
      require("postcss-import")({
        addDependencyTo: webpack,
      }),
      require("postcss-cssnext")({
        features: {
          autoprefixer: {
            browsers: ["last 2 versions"],
          },
        },
      }),
    ];
  },
};

const config = Object.create(configDev);

if (NODE_ENV === "production") {
  config.output = Object.assign({}, config.output, {
    path: path.resolve(__dirname, "dist"),
  }),
  config.devtool = undefined;

  config.module.loaders = [...config.module.loaders].map(loader => {
    if (loader.test.test(".css")) {
      return Object.assign({}, loader, {
        loader: ExtractTextWebpackPlugin.extract("css!postcss"),
      });
    }

    return loader;
  });

  config.plugins = [
    ...config.plugins,
    new webpack.optimize.UglifyJsPlugin(),
  ];
}

module.exports = config;
