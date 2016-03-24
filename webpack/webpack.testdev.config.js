"use strict";

const path = require("path")
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const configValues = require("../config");
const commonWebpackSettings = require("./webpack.base.config");


const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;
const CESIUM = configValues.CESIUM;


let testExternals = [
    // Tack on some more externals I found somewhere that may or may not actually help.
    {
        jsdom: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
    }
];


const htmlPlugin = // Auto-generate an HTML host page, and insert links to our JS bundles
    new HtmlWebpackPlugin({
        // Sort the inserted script tags by dependency graph
        chunksSortMode : 'dependency',
        template: "test/test.html"
    });




const testWebpackConfig = merge(commonWebpackSettings.baseWebpackConfig, {
    // Important in order not to bundle built-in modules like path, fs, etc
    //target : "node",
    node: {
        fs: "empty"
    },

    entry : {
        appTestBundle : [
            // Hook up the hot-reloading middleware so it can be notified a bundle has been rebuilt
            'webpack-hot-middleware/client',
            "mocha!" + path.join(PATHS.base, "test/testEntry.js"),
        ],
        vendor : commonWebpackSettings.baseDependencies.concat("chai", "enzyme", "sinon"),
    },

    output : {
        path : PATHS.dist + "test-live"
    },


    resolve : {
        alias : {
            cesium : CESIUM.prodBuildPath,
            sinon: 'sinon/pkg/sinon.js',
        }
    },

    module : {
        loaders: [
            commonWebpackSettings.baseBabelLoader,
            {
                test: /(\.css|\.less)$/,
                loader: 'null-loader'
            },
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/,
                loader: 'null-loader'
            },
            { test: /Cesium\.js$/, loader: "exports?window.Cesium!script" },
            {
                test: /sinon\.js/,
                loader: 'imports?define=>false,require=>false',
            },
            { test: /\.json/, loader : "json" }
        ],

        noParse : [
            path.join(CESIUM.prodBuildPath, "/Cesium.js"),
            /sinon\.js/
        ]
    },

    plugins : [

        // The "standard" file watching support sucks up 20-25% CPU when running
        // on Windows, possibly because it's watching /node_modules/.  Using this
        // appears to give the same fast change detection, with minimal CPU usage.
        new webpack.OldWatchingPlugin(),

    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */
        new webpack.HotModuleReplacementPlugin(),

    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            names: ["cesiumBundle", "vendor"],
            minChunks: Infinity,
            filename : "[name].js"
        }),
        new webpack.optimize.DedupePlugin(),
        
        htmlPlugin

    ],

    externals : testExternals,

    devtool : "source-map"
});


module.exports = testWebpackConfig;