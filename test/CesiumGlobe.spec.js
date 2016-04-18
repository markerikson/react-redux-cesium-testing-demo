import React from 'react'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon';

import {BillboardCollection} from "cesiumDll/Cesium";

import CesiumBillboard from "components/CesiumBillboard";

function createScene() {
    const add = sinon.spy();
    const remove = sinon.spy();

    const scene = {
        primitives : {
            add,
            remove
        },

        isDestroyed() {
            return false;
        }
    };

    return {add, remove, scene};
}

// Tests of a component that requires Cesium
// Note that we do NOT try to render a component that actually tries
// to create a Cesium.Scene, as WebGL is not supported under Node.
describe("CesiumBillboard", () => {
   it("mounts properly", () => {
        const wrapper = mount(<CesiumBillboard />);
    });

    it("Adds its BillboardCollection to a Scene on mount", () => {
        const {add, scene} = createScene();

        const wrapper = mount(<CesiumBillboard scene={scene}/>);

        expect(add.calledOnce).to.be.true;
        const [addaArg] = add.firstCall.args;
        expect(addaArg).to.be.an.instanceof(BillboardCollection);
    });

    it("Removes its BillboardCollection on unmount if the Scene is not destroyed", () => {
        const {remove, scene} = createScene();

        const wrapper = mount(<CesiumBillboard scene={scene}/>);

        wrapper.unmount();

        expect(remove.calledOnce).to.be.true;
    });

});
