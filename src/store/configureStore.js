import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */


const middleware = [thunk];

const storeEnhancers = [];


if(__DEV__) {
    const DevTools = require("../containers/DevTools").default;

    // If the user has the "Redux DevTools" browser extension installed, use that.
    // Otherwise, hook up the in-page DevTools UI component.
    let debugEnhancer = window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument();
    storeEnhancers.push(debugEnhancer);
}

const middlewareEnhancer = applyMiddleware(...middleware);
storeEnhancers.unshift(middlewareEnhancer);


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(...storeEnhancers)
    );

    if(__DEV__) {
        // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () =>
                store.replaceReducer(require('../reducers/rootReducer').default)
            );
        }
    }

    return store;
}
