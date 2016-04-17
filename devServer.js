"use strict";

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack/webpack.dev.config.js');

const configValues = require("./config");

const PATHS = configValues.PATHS;
const ENVIRONMENT = configValues.ENVIRONMENT;
const CESIUM = configValues.CESIUM;

const app = express();
const compiler = webpack(webpackConfig);

const dllPath = path.join(PATHS.base, "distdll");

app.use(require('webpack-dev-middleware')(compiler, {
    /**
     * Webpack-dev-middleware config
     * Reference: https://webpack.github.io/docs/webpack-dev-middleware.html
     */

    publicPath : webpackConfig.output.publicPath,

    // Use preset option for Webpack stats display, which gives
    // nice colorized info without overly-large amounts of detail
    stats: "normal",

}));

app.use(require('webpack-hot-middleware')(compiler));

app.use("/", express.static(PATHS.src));
app.use("/", express.static(dllPath));
app.use("/cesium", express.static(CESIUM.debugBuildPath));



app.listen(ENVIRONMENT.port, ENVIRONMENT.host, (err) => {
    if(err)
    {
        console.log(err);
        return;
    }

    console.log(`Listening at http://${ENVIRONMENT.host}:${ENVIRONMENT.port}`);
});
