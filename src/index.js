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

const rootEl = document.getElementById("root");



let render = () => {
    const Root = require("containers/Root").default;
    ReactDOM.render(
        <Root store={store} />,
        rootEl
    );
};


if(module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require("redbox-react");
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl,
        );
    };

    render = () => {
        try {
            renderApp();
        }
        catch(error) {
            renderError(error);
        }
    };

    module.hot.accept("./containers/Root", () => {
        setTimeout(render);
    });
}

render();