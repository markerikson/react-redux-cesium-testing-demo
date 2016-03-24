import React, {Component} from 'react';


export default () => {
    return new Promise(resolve => {
        require.ensure([], () => {
            const DynamicallyLoadedComponent = require('./DynamicallyLoadedComponent').default;
            resolve(DynamicallyLoadedComponent);
        });
    });
};