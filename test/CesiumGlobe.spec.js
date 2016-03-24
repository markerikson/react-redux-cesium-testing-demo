import React from 'react'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon';

import {BillboardCollection} from "cesium/Cesium";

import CesiumBillboard from "components/CesiumBillboard";

// Tests of a component that requires Cesium
// Note that we do NOT try to render a component that actually tries
// to create a Cesium.Scene, as WebGL is not supported under Node.
describe("CesiumBillboard", () => {
   it("mounts properly", () => {
        const wrapper = mount(<CesiumBillboard />);
    })

    it("Has a BillboardCollection", () => {
        const wrapper = mount(<CesiumBillboard />);

        let inst = wrapper.instance();
        expect(inst.billboards).to.be.an.instanceof(BillboardCollection);
        expect(inst.billboards.length).to.equal(0);
    })

    it("Can add a billboard", () => {
        const wrapper = mount(<CesiumBillboard />);

        let inst = wrapper.instance();
        inst.addBillboard();

        expect(inst.billboards.length).to.equal(1);
    })

    it("Can unmount", () => {
        const wrapper = mount(<CesiumBillboard />);

        let inst = wrapper.instance();

        wrapper.unmount();

        expect(inst.billboards.length).to.equal(0);
        expect(inst.billboards.isDestroyed()).to.be.true;
    })

});
