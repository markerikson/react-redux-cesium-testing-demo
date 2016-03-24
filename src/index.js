import React from "react";
import ReactDOM from "react-dom";

import configureStore from './store/configureStore';

import Root from "containers/Root";


import "./styles/base.css";

if (module.hot) {
    module.hot.accept();
}


if (__DEV__ && !document.documentElement.animate) {
    // Add a polyfill for Element.animate so that the React render visualizer
    // plugin will work okay in all browsers (namely, Firefox)
    require('web-animations-js');
}


const store = configureStore();

window.React = React;


ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);
