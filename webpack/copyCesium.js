"use strict";

const path = require("path");
const configValues = require("./../config");
const fs = require("fs-extra");

const glob = require('glob');

const PATHS = configValues.PATHS;

const outputPath = path.join(PATHS.base, "dist/cesium");
const inputPath = path.join(PATHS.base, "node_modules/cesium/Build/Cesium/**/*.js");



let globOptions = {
    nodir : true,
    cwd : "node_modules/cesium/Build/Cesium/",
    ignore: ["*Cesium.js", "**/NaturalEarthII/**/*", "**/maki/**/*"]
};


glob("**/*", globOptions, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.

    files.forEach(function (srcPath) {
        let fullSrcPath = path.join("node_modules/cesium/Build/Cesium/", srcPath);
        let fullDestPath = path.join(outputPath, srcPath);
        fs.copySync(fullSrcPath, fullDestPath);
    });

    console.log("Cesium copied to output folder");
})