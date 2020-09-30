import React, { Component } from 'react';
//import { Route } from 'react-router';
//import Customer from './components/Customer';
//import Sales from './components/Sales';
import { NavLink } from 'react-router-dom';
import { Container, Menu, Header } from 'semantic-ui-react';

export default class NavBar extends Component {
  static displayName = NavBar.name;
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container fluid>
          <Menu inverted size="large" fluid stackable>
            <Menu.Item
              as={NavLink}
              color="black"
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
              color="black"
              active={activeItem === 'Customer'}
              content="Customer"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/store"
              name="Store"
              color="black"
              active={activeItem === 'Store'}
              content="Store"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/product"
              name="Product"
              color="black"
              active={activeItem === 'Product'}
              content="Product"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/sales"
              name="Sales"
              color="black"
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
