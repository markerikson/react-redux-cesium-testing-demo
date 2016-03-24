// Note that we do not import Enzyme until AFTER we've fiddled with React's internals,
// as Enzyme pulls in React, and we need those settings changed first.
let chai = require("chai");
let chaiEnzyme = require("chai-enzyme");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiEnzyme())
chai.use(chaiAsPromised);

global.expect = chai.expect;