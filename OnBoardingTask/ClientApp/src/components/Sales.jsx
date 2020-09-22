import React, { Component } from 'react';
import { Table, TableBody, Button } from 'semantic-ui-react';
import axios from 'axios';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isopen: false,
    };
  }

  handleOpen = () => {
    this.setState({
      isopen: true,
    });
  };

  componentDidMount() {
    console.log('data');

    axios
      .get('/Sales/GetSales')
      .then((result) => {
        this.setState({
          data: result.data,
        });
        console.log(result.data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  render() {
    let items = this.state.data;
    return (
      <div>
        <Button primary onClick={() => this.handleOpen()}>
          New Record
        </Button>

        {/* <ModalForm openvalue={this.state.isopen}/> */}

        <Table celled fixed singleLine compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store</Table.HeaderCell>
              <Table.HeaderCell>DateSold</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => {
              return (
                <Table.Row>
                  <Table.Cell>{item.customer.name}</Table.Cell>
                  <Table.Cell>{item.product.name}</Table.Cell>
                  <Table.Cell>{item.store.name}</Table.Cell>
                  <Table.Cell>{item.dateSold}</Table.Cell>

                  <Table.Cell>Edit</Table.Cell>
                  <Table.Cell>Delete</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
