import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        // initial state
        this.state = {
            fishes: {},
            order: {}
        }
    }

    addFish(fish) {
        // update state
        const fishes = {...this.state.fishes};
        // add new fish
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        // set state
        this.setState({ fishes: fishes });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        )
    }
}

export default App;