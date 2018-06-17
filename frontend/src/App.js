import React, { Component } from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';
import Main from './views/main';
import './App.css';
import store from './store';

class App extends React.Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path={'/'} component={Main} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
