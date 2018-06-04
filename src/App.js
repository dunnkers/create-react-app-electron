import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Input, Spin, message, List } from 'antd';

import logo from './logo.svg';
import './App.css';

const Search = Input.Search;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      loading: false,
      data: null
    };
  }

  changeCount(number) {
    this.setState({
      ...this.state,
      count: this.state.count + number
    });
  }

  search(username) {
    if (!username) {
      return;
    }

    this.setState({
      ...this.state,
      loading: true
    });

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data
        });
      }, error => {
        this.setState({
          ...this.state,
          loading: false
        });

        message.error(error.message);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <Button onClick={() => this.changeCount(1)}>increase</Button>
          <Button onClick={() => this.changeCount(-1)}>decrease</Button>
        </p>
        <p>{this.state.count}</p>
        <div className="App-repo-search">
          View Github user repos:
          <Spin spinning={this.state.loading}>
            <Search
              placeholder="Github username…"
              onSearch={username => this.search(username)}
              enterButton
            />
          </Spin>
          <List
            bordered
            dataSource={this.state.data || []}
            renderItem={item => (
              <List.Item actions={[
                <a href={item.html_url + '/stargazers'}>
                  {item.stargazers_count} ⭐️
                </a>,
                <a href={item.html_url}>🌐</a>
              ]}>
                <a href={item.url}>{item.name}</a>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
