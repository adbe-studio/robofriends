import React, { Component } from 'react';
import CardList from '../components/CardList';
// import { robots } from '../robots';
import Searchbox from '../components/Searchbox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoudry from '../components/ErrorBoudry'

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (!robots.length) {
            return <h1 className='tc'>Loading</h1>
        } else {
        return (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoudry>
                        <CardList robots={filterRobots} />
                    </ErrorBoudry>
                </Scroll>
            </div>
            )
        }
    }
}

export default App;