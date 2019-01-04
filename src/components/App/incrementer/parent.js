import React from "react";

import Child from "./child";

class Parent extends React.Component {
    static get defaultProps() {
        return {
            buttonText: {
                increment: 'Increment',
                decrement: 'Decrement',
                reset: 'Reset'
            }
        };
    }

    static initialState = {
        count : 0
    }

    constructor(props) {
        super(props);
        this.state = Parent.initialState;
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    increment() {
        this.setState((state, props) => ({
            count: (state.count + 1)
        }));
    }

    decrement() {
        this.setState((state, props) => ({
            count: (state.count - 1)
        })); 
    }

    reset() {
        this.setState((state, props) => ({
            count: Parent.initialState.count
        })); 
    }

    render() {
        return (
            <div>
                <button onClick={this.increment}>{this.props.buttonText.increment}</button>
                <button onClick={this.decrement}>{this.props.buttonText.decrement}</button>
                <button onClick={this.reset}>{this.props.buttonText.reset}</button>
                <div>{this.state.count}</div>
                <Child count={this.state.count}/>
            </div>
        )
    }
}

export default Parent;