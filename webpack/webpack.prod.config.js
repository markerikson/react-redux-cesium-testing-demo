"use strict";

const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const configValues = require("../config");
const commonWebpackSettings = require("./webpack.base.config");


const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;
const CESIUM = configValues.CESIUM;


const prodWebpackConfig = merge(commonWebpackSettings.baseWebpackConfig, {
    entry : {
        app : PATHS.src + "/index.js"
    },

    module : {
        loaders: [
            commonWebpackSettings.baseBabelLoader,
            commonWebpackSettings.baseImageLoaders,
            // Extract CSS during build
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css')}
        ],

        noParse : [
        ]
    },


    resolve : {
        alias : {
        }
    },

    plugins : [
        // Force more consistent build hashes
        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.DedupePlugin(),


        new webpack.DllReferencePlugin({
            context: ".",
            manifest: require(path.join(PATHS.base, "distdll/vendor-manifest.json")),
        }),

        new webpack.DllReferencePlugin({
            scope : "cesiumDll",
            manifest: require(path.join(PATHS.base, "distdll/cesiumDll-manifest.json")),
        }),

        // Output extracted CSS to a file
        new ExtractTextPlugin('[name].css', {allChunks : true}),

        // Setting DefinePlugin affects React library size!
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        commonWebpackSettings.htmlPlugin
    ],

    devtool : "source-map"
});


module.exports = prodWebpackConfig;