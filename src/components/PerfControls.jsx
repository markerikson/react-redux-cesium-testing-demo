import React, {Component} from 'react';
import Perf from "react-addons-perf";

import Box, {Container, VBox, Page} from "react-layout-components"


let Button = ({label, onClick}) => {
    return (
        <button className='btn btn-default'
                onClick={onClick}>
            {label}
        </button>
    );
}


export default class PerfControls extends React.Component {
    perfStart() {
        Perf.start();
    }

    perfStop() {
        Perf.stop();
        let measurements = Perf.getLastMeasurements();
        Perf.printInclusive(measurements);
        Perf.printExclusive(measurements);
        Perf.printWasted(measurements);
    }

    render() {
        return (
            <Box>
                <Button label="Perf Start" onClick={this.perfStart} />
                <Button label="Perf Stop" onClick={this.perfStop} />
            </Box>
        );
    }
}