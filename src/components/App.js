import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

    // initial state
    state = {
        fishes: {},
        order: {}
    }

    componentWillMount() {
        // this runs right before <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
            {
                context: this,
                state: 'fishes'
            }
        );

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            // update App components order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish = (fish) => {
        // update state
        const fishes = {...this.state.fishes};
        // add new fish
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        // set state
        this.setState({ fishes: fishes });
    };

    updateFish = (key, updatedFish) => {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    };

    removeFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    };

    loadSamples = () => {
        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = (key) => {
        // take a cop of the state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update state
        this.setState({ order });
    };

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {
                            Object
                            .keys(this.state.fishes)
                            .map(key => <Fish
                                            addToOrder={this.addToOrder}
                                            key={key}
                                            index={key}
                                            details={this.state.fishes[key]}
                                        />)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;