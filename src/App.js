import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  changeCount(number) {
    const count = this.state.count + number;

    this.setState({ count });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.changeCount(1)}>increase</button>
          <button onClick={() => this.changeCount(-1)}>decrease</button>
        </p>
        <p>{this.state.count}</p>
      </div>
    );
  }
}

export default hot(module)(App);
