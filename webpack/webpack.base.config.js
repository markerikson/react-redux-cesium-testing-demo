"use strict";

const path = require("path")
const webpack = require('webpack')
const fs = require("fs");

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const configValues = require("../config")

// Import our package.json so we can refer to some of the dependency listings
const packageJson = require('../package.json');

const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;


const NODE_ENV = configValues.env;


const baseBabelLoader = {
    // Load all files with a .jsx or .jsx extension
    test: /\.jsx?/,
    // that's inside our "src" folder
    include: [PATHS.src, path.join(PATHS.base, "test")],
    // and ignore anything that's a separate library
    exclude: [/node_modules/],
    // run it through Babel, and cache results in the OS temp folder.
    // Note that Babel itself is configured using a ".babelrc" file
    loader: 'babel',
    query : {
        cacheDirectory : true
    }
};


const baseImageLoaders = [
    // Look for images, and turn them into embedded base64 strings if they're small enough
    { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' },
];




const baseWebpackConfig = {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    entry: {},

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output : {
        // Write out files to our "dist" folder
        path : PATHS.dist,
        // Each entry point becomes a separate bundled file
        filename : '[name].js'
    },

    // Automatically try to load imports if the name has any of these extensions
    // In other words, do require("a") instead of require("a.jsx")
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        root : PATHS.src,

        // Whenever someone does import "react", resolve the one in the node_modules
        // at the top level, just in case a dependency also has react in its node_modules,
        // we don't want to be running to versions of react!!!
        alias: {
            react: path.join(PATHS.base, "node_modules/react")
        }
    },

    module : {
        loaders: [
        ]
    },

    plugins : [
        // Do a preprocessor-like search and replace for several useful
        // values, such as "__DEV__" and "__PROD__"
        new webpack.DefinePlugin(configValues.globals)

    ]
}



const baseDependencies = Object.keys(packageJson.dependencies);


const htmlPlugin = // Auto-generate an HTML host page, and insert links to our JS bundles
    new HtmlWebpackPlugin({
        // Sort the inserted script tags by dependency graph
        chunksSortMode : 'dependency',
        template: "src/index.template.html"
    });


module.exports = {
    baseBabelLoader : baseBabelLoader,
    baseImageLoaders : baseImageLoaders,
    baseDependencies : baseDependencies,
    baseWebpackConfig : baseWebpackConfig,

    htmlPlugin : htmlPlugin

}