import { expect } from 'chai';


import React from 'react'
import {mount, render, shallow} from 'enzyme'


import Root from "../src/containers/Root"

class Fixture extends React.Component {
    render () {
        return (
            <div style={{ border: 1 }}>
                <span style={{ color: 'red' }}>test</span>
            </div>
        )
    }
}


class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    render() {
        const { count } = this.state;
        return (
            <div>
                <div className={`clicks-${count}`}>
                    {count} clicks
                </div>
                <a onClick={() => this.setState({ count: count + 1 })}>
                    Increment
                </a>
            </div>
        );
    }
}




describe('hello world test sequence', () => {
    it('works!', () => {
        expect(true).to.be.true;
    });

    it('has a second test', () => {
        expect("a").to.have.length(1)
    })
});


describe('second sequence in same file', () => {

    const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

   it('might work?', () => {
       expect(true).to.be.true;
   })

    it('has a React component', () => {

        let keys = Object.keys(expect(wrapper).to.have);
        expect(wrapper).to.have.style('border')
        expect(wrapper).to.not.have.style('color')

        expect(wrapper).to.have.style('border', '1px')
        expect(wrapper).to.not.have.style('border', '2px')

        expect(wrapper).to.have.style('border').equal('1px')
    })
});


describe('testing interaction with a component', () => {
    const wrapper = mount(<Foo />);

    it("Can click on stuff", () => {

        expect(wrapper.find('.clicks-0').length).to.equal(1);
        wrapper.find('a').simulate('click');
        expect(wrapper.find('.clicks-1').length).to.equal(1);
    })
})



