import React, { Component } from 'react';
import Customers from './components/Customer';
import Sales from './components/Sales';
import Products from './components/Products';
import Stores from './components/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

export default class App extends Component {
  static displayName = App.name;
  state = {};

  render() {
    return (
      <div>
        <Router>
          <Layout>
            <Route path="/" exact render={() => <Customers />} />
            <Route path="/sales" exact render={() => <Sales />} />
            <Route path="/stores" exact render={() => <Stores />} />
            <Route path="/products" exact render={() => <Products />} />
          </Layout>
        </Router>
      </div>
    );
  }
}
