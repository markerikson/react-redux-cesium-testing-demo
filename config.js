"use strict";

const path = require("path");


const projectBasePath = path.resolve(__dirname);

let cesiumModuleFolder = "node_modules/cesium/";
let cesiumBuildFolder = path.join(cesiumModuleFolder, "/Build/");
let cesiumSourceFolder = path.join(cesiumModuleFolder, "/Source/");

let cesiumDebugName = "/CesiumUnminified/";
let cesiumProdName = "/Cesium/";

let cesiumDebugFolder = path.join(cesiumBuildFolder, cesiumDebugName);
let cesiumProdFolder = path.join(cesiumBuildFolder, cesiumProdName);

let localCesiumDebugPath = path.join(projectBasePath, cesiumDebugFolder);
let localCesiumProdPath = path.join(projectBasePath, cesiumProdFolder);

const localCesiumSourcePath = path.join(projectBasePath, cesiumSourceFolder);

const config = {
    env : process.env.NODE_ENV,

    PATHS : {
        base : projectBasePath,
        src: path.resolve(projectBasePath, 'src'),
        dist: path.resolve(projectBasePath, 'dist')
    },

    ENVIRONMENT : {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    },


    CESIUM : {
        moduleFolder : cesiumModuleFolder,
        buildFolder : cesiumBuildFolder,
        sourceFolder : cesiumSourceFolder,
        debugBuildPath : localCesiumDebugPath,
        prodBuildPath : localCesiumProdPath,
        sourcePath : localCesiumSourcePath
    }
};

let isDev = config.env === 'development';
let isProd = config.env === 'production';
let isTest = config.env === 'test';


config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(isDev ? "development" : "production")
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : isDev,
    '__PROD__'     : isProd,
    '__TEST__'     : isTest
}


module.exports = config;