import React from 'react'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon';


import {INCREMENT_COUNTER} from "constants/ActionTypes";
import {Counter} from "../src/containers/Counter"


// Some basic tests for a React component that uses Redux
describe('Counter component can count', () => {

    const handleButtonClick = sinon.spy();

    const wrapper = mount(<Counter counter={0} dispatch={handleButtonClick} />);
    let counterValues = wrapper.find(".counterValue");
    let buttons = wrapper.find('button');

    it("Counts properly using state management", () => {
        let stateCounterValue = counterValues.first();

        let stateValue = stateCounterValue.text();
        expect(stateValue).to.equal('0');

        let incrementStateButton = buttons.filterWhere(button => button.text() === 'Increment Component');

        expect(incrementStateButton.length).to.equal(1);

        incrementStateButton.simulate('click');
        stateValue = stateCounterValue.text();
        expect(stateValue).to.equal('1');
    });

    it("Counts properly using Redux actions", () => {
        let reduxCounterValue = counterValues.last();
        let reduxValue = reduxCounterValue.text();
        expect(reduxValue).to.equal('0');

        let incrementReduxButton = buttons.filterWhere(button => button.text() === 'Increment Redux')
        expect(incrementReduxButton.length).to.equal(1);

        incrementReduxButton.simulate('click');
        expect(handleButtonClick.calledOnce).to.equal(true);
        expect(handleButtonClick.calledWith({type : INCREMENT_COUNTER})).to.be.true;

        wrapper.setProps({counter : 5});

        reduxValue = reduxCounterValue.text();
        expect(reduxValue).to.equal('5');
    });
});