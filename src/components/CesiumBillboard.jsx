import React, {Component} from 'react';
import Cesium, {Billboard, BillboardCollection} from "cesiumDll/Cesium"

import fireflyIcon from "styles/Firefly.png";

// A React component that manages some Cesium primitives
export default class CesiumBillboard extends Component {
    componentDidMount() {
        this.billboards = new BillboardCollection();
    }

    addBillboard() {
        this.billboards.add({
            position : new Cesium.Cartesian3(1.0, 2.0, 3.0),
            image : fireflyIcon
        });
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.billboards.destroy();
    }
}


