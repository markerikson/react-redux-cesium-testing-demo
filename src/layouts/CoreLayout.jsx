import React, {Component} from 'react';
import Box, {Container, VBox, Page} from "react-layout-components"

import Counter from "containers/Counter"
import PerfControls from "components/PerfControls";

import CesiumGlobe from "components/CesiumGlobe";

import loadDynamicComponent from "components/loadDynamicComponent";



export default class CoreLayout extends React.Component {
    static propTypes = {
        actions  : React.PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            LoadedTestComponent : null
        };
    }
    
    componentDidMount() {
        loadDynamicComponent()
            .then(DynamicallyLoadedComponent => this.setState({DynamicallyLoadedComponent}))
    }

    render () {
        let dynamicComponent = null;

        let {DynamicallyLoadedComponent} = this.state;
        
        if(DynamicallyLoadedComponent) {
            dynamicComponent = <DynamicallyLoadedComponent text="Loaded" />
        }

        
        return (
            <Container className="pageLayout border" fit>
                <Container className="leftPane border" column width={350} >
                    <PerfControls />
                    <Counter />
                    {dynamicComponent}
                </Container>
                <Container className="rightPane border" column flexGrow={2} borderColor="green" >
                    <CesiumGlobe />
                </Container>
            </Container>
        )
    }
}