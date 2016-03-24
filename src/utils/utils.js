import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
//import DevTools     from 'containers/DevToolsWindow';

export function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}

export function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}


/*

export function createDevToolsWindow (store) {
  const win = window.open(
    null,
    'redux-devtools', // give it a name so it reuses the same window
    `width=400,height=${window.outerHeight},menubar=no,location=no,resizable=yes,scrollbars=no,status=no`
  );

  // reload in case it's reusing the same window with the old content
  win.location.reload();

  // wait a little bit for it to reload, then render
  setTimeout(() => {
    // Wait for the reload to prevent:
    // "Uncaught Error: Invariant Violation: _registerComponent(...): Target container is not a DOM element."
    win.document.write('<div id="react-devtools-root"></div>');
    win.document.body.style.margin = '0';

    ReactDOM.render(
      <Provider store={store}>
        <DevTools />
      </Provider>
      , win.document.getElementById('react-devtools-root')
    );
  }, 10);
}
*/


export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
// Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }
  return true
}

export function smarterIsEqual(oldValue, newValue) {
  let areSameReference = (oldValue === newValue);
  let areShallowEqual = false;
  let areLooselyEqual = false;

  if(!areSameReference) {
    areShallowEqual = shallowEqual(oldValue, newValue);
  }

  if(!areShallowEqual) {
    areLooselyEqual = _.isEqual(oldValue, newValue);
  }

  return areSameReference || areShallowEqual || areLooselyEqual;
}

export function smarterShouldComponentUpdate(nextProps, nextState) {
  return !smarterIsEqual(this.props, nextProps) || !smarterIsEqual(this.state, nextState);
}

export let smarterUpdateMixin = {
  shouldComponentUpdate : smarterShouldComponentUpdate
};


export function mixin(Parent, ...mixins) {
  class Mixed extends Parent {}
  for (let mixin of mixins) {
    for (let prop in mixin) {
      Mixed.prototype[prop] = mixin[prop];
    }
  }
  return Mixed;
};