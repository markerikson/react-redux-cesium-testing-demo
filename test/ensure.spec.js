import React from "react";

import loadDynamicComponent from "components/loadDynamicComponent";


// Some random tests playing around with asynchronous behavior,
// using Webpack's require.ensure and Chai-As-Promised
describe("Does stuff with require.ensure()", () => {

    it("is a function", () => {
        expect(loadDynamicComponent).to.be.a.function;
    })
    
    let loadedComponentPromise = loadDynamicComponent();
    
    it("Loaded component promise resolves", () => {        
        return expect(loadedComponentPromise).to.eventually.be.resolved;
    })
    
    it("Loaded component promise is a function", () => {
        return expect(loadedComponentPromise).to.eventually.be.a.function
    })

    it("Promise is resolved", () => {
        return expect(Promise.resolve({})).to.eventually.be.resolved;
    })

    it("Resolved promise has some data", () => {
        return expect(Promise.resolve({ fred: "bar" })).to.eventually.have.property("fred");
    })

    it("Resolved promise data not-equal check works", () => {
        return expect(Promise.resolve({ fred: "bar" })).to.eventually.not.equal({a : 42});
    })

    it("Rejected promise check works", () => {
        return expect(Promise.reject()).to.eventually.be.rejected;
    })

    // Demo of a Mocha/Chai-As-Promised bug: https://github.com/domenic/chai-as-promised/issues/56
    /*
    it('should fail if called with an error that is undefined', function (done) {
        done(undefined);
    });
    */
})