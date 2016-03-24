/**
 * Just like our store, we configure a 'Root' component that is
 * required based on the env variable. This component is typically one
 * surrounded by a <Provider>.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Box, {Container, VBox, Page} from "react-layout-components"
import CoreLayout from "layouts/CoreLayout"

let DevTools = null;

if(__DEV__) {
    DevTools = require("./DevTools").default;
}


export default class Root extends Component {
    render() {
        const { store } = this.props;

        let devToolsComponent = null;

        if(__DEV__ && !window.devToolsExtension) {
            devToolsComponent = <DevTools />;
        }

        return (
        /**
         * Provider is a component provided to us by the 'react-redux' bindings that
         * wraps our app - thus making the Redux store/state available to our 'connect()'
         * calls in component hierarchy below.
         */
            <Provider store={store}>
                <Page>
                    <CoreLayout />
                    {devToolsComponent}
                </Page>
            </Provider>
        );
    }
};


