import React, {Component} from 'react';
import {findDOMNode} from "react-dom"

// Set this global variable so that Cesium generates requests for its
// own assets properly, with this as a prefix.
// Note that this corresponds to the static file handling in our dev server,
// and that the production output should include the Cesium build output
// in a folder by this name as well.
window.CESIUM_BASE_URL = "/cesium/";

import "assets/cesiumWidgets.css"
import cs from "cesiumDll/Cesium"




class CesiumGlobe extends Component {
  componentDidMount() {
    this.viewer = new cs.Viewer(this.refs.cesiumNode);
  }

  componentWillUnmount() {
    if(this.viewer) {
      this.viewer.destroy();
    }
  }

  checkVersion() {
    console.log("VERSION: ", cs.VERSION);
  }


  render() {
    return (
      <div className="cesiumWidget" ref="cesiumNode" />

    );
  }
}

export default CesiumGlobe;