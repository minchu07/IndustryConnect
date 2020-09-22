import React, { Component } from 'react';
//import { Route } from 'react-router';
//import Customer from './components/Customer';
//import Sales from './components/Sales';
import { NavLink, withRouter } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default class App extends Component {
  static displayName = App.name;
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container fluid>
          <Menu>
            <Menu.Item
              as={NavLink}
              to="/"
              name="Home"
              active={activeItem === 'Home'}
              content="Home"
              onClick={this.handleItemClick}
            />

            <Menu.Item
              as={NavLink}
              to="/customer"
              name="Customer"
              active={activeItem === 'Customer'}
              content="Customer"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/store"
              name="Store"
              active={activeItem === 'Store'}
              content="Store"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/product"
              name="Product"
              active={activeItem === 'Product'}
              content="Product"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/sales"
              name="Sales"
              active={activeItem === 'Sales'}
              content="Sales"
              onClick={this.handleItemClick}
            />
          </Menu>
        </Container>
      </div>
    );
  }
}
