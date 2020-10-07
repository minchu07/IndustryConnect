import React, { Component } from 'react';
//import { Route } from 'react-router';
//import Customer from './components/Customer';
//import Sales from './components/Sales';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

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
            <Menu.Item as={'h3'} header>
              React{' '}
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/"
              name="Customers"
              color="black"
              active={activeItem === 'Customers'}
              content="Customers"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/products"
              name="Products"
              color="black"
              active={activeItem === 'Products'}
              content="Products"
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              to="/stores"
              name="Stores"
              color="black"
              active={activeItem === 'Stores'}
              content="Stores"
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
