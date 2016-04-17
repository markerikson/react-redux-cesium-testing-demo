"use strict";

const configValues = require("../config");
const commonWebpackSettings = require("./webpack.base.config");

const path = require("path");
const webpack = require("webpack");

const PATHS = configValues.PATHS;

const outputPath = path.join(PATHS.base, "distdll");

const webpackConfig = {
    entry : {
        vendor : commonWebpackSettings.baseDependencies,
    },
    devtool : "#source-map",
    output : {
        path : outputPath,
        filename : "[name].dll.js",
        library : "[name]_[hash]",
    },
    plugins : [
        new webpack.DllPlugin({
            path : path.join(outputPath, "[name]-manifest.json"),
            name : "[name]_[hash]",
        }),

        // Setting DefinePlugin affects React library size!
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
};

module.exports = webpackConfig;