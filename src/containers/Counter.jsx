import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import autoBind from 'react-autobind';
import Box, {Container, VBox, Page} from "react-layout-components"

import fireflyIcon from "./Firefly.png";

import {INCREMENT_COUNTER, DECREMENT_COUNTER} from "../constants/ActionTypes"



export const CounterValue = ({value}) => <div>Counter: <span className="counterValue">{value}</span></div>;


// A sample component that renders several assorted test pieces of UI
export class Counter extends Component {
    // Enable the React-Transform-Render-Visualizer debugging display for this component class
    static rerenderViz = true;
    constructor(props) {
        super(props);

        this.state = {counter: 0};

        autoBind(this);
    }

    increment() {
        this.setState({counter: this.state.counter + 1});
    }

    incrementAction() {
        this.props.dispatch({type : INCREMENT_COUNTER})
    }

    decrementAction() {
        this.props.dispatch({type : DECREMENT_COUNTER})
    }

    decrement() {
        this.setState({counter: this.state.counter - 1});
    }

    render() {
        return (
            <div>
                <p>Testing a React component... (abcd) </p>
                <div><img src={fireflyIcon} /></div>
                <div>Component state counter:
                    <CounterValue value={this.state.counter} />
                </div>
                <div>Redux state counter:
                    <CounterValue value={this.props.counter} />
                </div>
                <VBox>
                    <button onClick={this.increment}>Increment Component</button>
                    <button onClick={this.decrement}>Decrement Component</button>
                    <button onClick={this.incrementAction}>Increment Redux</button>
                    <button onClick={this.decrementAction}>Decrement Redux</button>
                </VBox>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {counter : state.counter};
}


const ConnectedCounter = connect(mapStateToProps)(Counter);

export default ConnectedCounter;


