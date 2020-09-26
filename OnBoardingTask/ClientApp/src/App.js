import React, { Component } from 'react';
import Customer from './components/Customer';
import Sales from './components/Sales';
import Home from './components/Home';
import Product from './components/Products';
import Store from './components/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';

export default class App extends Component {
  static displayName = App.name;
  state = {};

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Route path="/" exact render={() => <Home />} />
          <Route path="/customer" exact render={() => <Customer />} />
          <Route path="/store" exact render={() => <Store />} />
          <Route path="/sales" exact render={() => <Sales />} />
          <Route path="/product" exact render={() => <Product />} />
        </Router>
      </div>
    );
  }
}