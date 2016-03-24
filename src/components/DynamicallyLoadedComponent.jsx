import React, {Component} from 'react';

// A tiny sample component that will be dynamically loaded using Webpack
const DynamicallyLoadedComponent = ({text}) => <div>Dynamically requested component: <span>{text}</span></div>;

export default DynamicallyLoadedComponent;