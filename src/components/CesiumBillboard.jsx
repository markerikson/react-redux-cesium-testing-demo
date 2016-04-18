import React, {Component} from 'react';
import Cesium, {Billboard, BillboardCollection} from "cesiumDll/Cesium"

import fireflyIcon from "styles/Firefly.png";

// A React component that manages some Cesium primitives
export default class CesiumBillboard extends Component {
    componentDidMount() {
        const {scene} = this.props;

        this.billboards = new BillboardCollection();

        if(scene) {
            scene.primitives.add(this.billboards);
        }

        this.billboard = this.billboards.add({
            position : Cesium.Cartesian3.fromDegrees(-117.0, 35.0, 10000),
            image : fireflyIcon,
            //scale : 0.5
        });
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        const {scene} = this.props;
        if(scene && !scene.isDestroyed()) {
            scene.primitives.remove(this.billboards);
        }

        if(this.billboards && !this.billboards.isDestroyed()) {
            this.billboards.destroy();
        }
    }
}


