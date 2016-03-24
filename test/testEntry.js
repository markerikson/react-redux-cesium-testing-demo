require("./testSetup");


// A bit of Webpack magic.  Create a specialized version of "require"
// that recursively scans this folder for any file ending with "spec.js",
// then run each filename through the require function itself.
// Basically, auto-import all test files automatically.
const requireTest = require.context('.', true, /spec\.js$/);
requireTest.keys().forEach(requireTest);