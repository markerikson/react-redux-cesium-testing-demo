// Set up various libraries and configuration pieces we need to run
// tests under Node using Mocha.  Note that this requires some ugly hacks.

"use strict";




let configValues = require("../config");

let jsdom = require("jsdom");

// Add several predefined values like "__DEV__" and "__PROD__" to Mocha's
// global environment, so that our code using them is parsed correctly.
Object.assign(global, configValues.globals);



const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// Add several other items to the global scope during a test run.
// Mostly swiped from various sample projects and pasted as-is.

global.document = doc;
global.window = win;
global.window.document = {createElement: function(){}};
// Add a user-agent string to quiet the inline-prefixer module
global.navigator = {
    userAgent : "Mozilla/5.0 (Windows NT 6.1; rv:38.0) Gecko/20100101 Firefox/38.0"
};

console.debug = console.log;


// Override this deeply internal flag inside React so that we can
// mount/unount components without React blowing up on us
require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;

// Reset this so that React doesn't whine about us being in development mode.
process.env.NODE_ENV= "production";


// Note that we do not import Enzyme until AFTER we've fiddled with React's internals,
// as Enzyme pulls in React, and we need those settings changed first.
let chai = require("chai");
let chaiEnzyme = require("chai-enzyme");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiEnzyme())
chai.use(chaiAsPromised);


let TestUtils = require("react-addons-test-utils");
global.render = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    const output = renderer.getRenderOutput();
    return {output, renderer};
};

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});




global.expect = chai.expect;








