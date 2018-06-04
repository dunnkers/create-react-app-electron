import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Input, Spin, message, List } from 'antd';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, data: null };
  }

  search(username) {
    if (username) {
      this.setState({ loading: true });
      
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(data => {
          this.setState({ data });
        }, error => {
          message.error(error.message);
        }).then(() => this.setState({ loading: false }));
    }
  }

  render() {
    const ListItem = item => (
      <List.Item actions={[
        <a href={item.html_url + '/stargazers'}>
          {item.stargazers_count} ⭐️
                </a>,
        <a href={item.html_url}>🌐</a>
      ]}>
        <a href={item.url}>{item.name}</a>
      </List.Item>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <p className="App-intro">View Github user repos:</p>

        <div className="App-repo-search">
          <Spin spinning={this.state.loading}>
            <Input.Search
              placeholder="Github username…"
              onSearch={username => this.search(username)}
              enterButton
            />
          </Spin>

          <List
            className="App-repo-search-list"
            bordered
            dataSource={this.state.data || []}
            renderItem={ListItem}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
