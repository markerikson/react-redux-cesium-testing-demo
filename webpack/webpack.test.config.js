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
    // Read in a list of all folders in /node_modules/, and use that as
    // a set of "external" references that don't have to be bundled in
    // at build time.  This lets us use normal synchronous lookups for
    // various dependencies at runtime under Mocha.  See
    // http://jlongster.com/Backend-Apps-with-Webpack--Part-I for details.
    nodeExternals({whitelist: ['cesium/Cesium']}),

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

    entry : {
        appTestBundle : path.join(PATHS.base, "test/testEntry.js"),
        vendor : commonWebpackSettings.baseDependencies.concat("chai", "enzyme", "sinon"),
    },

    output : {
        path : PATHS.dist + "test"
    },


    resolve : {
        alias : {
            cesiumDll : CESIUM.prodBuildPath,
            sinon: 'sinon/pkg/sinon.js',
            test : path.join(PATHS.base, "test")
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

            // We'll load Cesium directly off disk under test, rather than use the DLL.
            // This is mostly because it's what I initially got working, and haven't yet
            // taken time to figure out a better way to do it.
            { test: /Cesium\.js$/, loader: "exports?window.Cesium!script" },

            // Sinon is apparently really weird, and needs special handling when loading
            { test: /sinon\.js/,  loader: 'imports?define=>false,require=>false' },
            { test: /\.json/, loader : "json" }
        ],

        noParse : [
            /sinon\.js/
        ]
    },

    plugins : [
        new webpack.optimize.DedupePlugin()
    ],

    externals : testExternals,

    stats : {
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: true,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    },

    devtool : "#cheap-module-source-map"
});


module.exports = testWebpackConfig;