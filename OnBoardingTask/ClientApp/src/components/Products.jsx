import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Modal from './Modal';
import AddProduct from './AddProduct';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  componentDidMount = () => {
    console.log('data');
    this.fetchProductDetails();
  };
  fetchProductDetails() {
    axios
      .get('/Products/GetProduct')
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

  handleInsert = (name, price) => {
    const data = {
      Name: name,
      Price: price,
    };

    fetch('/Products/PostProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchProductDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.handleClose();
  };

  render() {
    let items = this.state.data;
    return (
      <div>
        <Button primary onClick={() => this.handleOpen()}>
          New Record
        </Button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          header={'Add Products'}
        >
          <AddProduct
            //  type="Create"
            onSubmit={this.handleInsert}
          ></AddProduct>
        </Modal>
        <Table celled fixed singleLine compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => {
              return (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      color="yellow"
                      onClick={() => this.onEditAction(item)}
                    >
                      <Icon name="edit" />
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      color="red"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      <Icon name="trash alternate" />
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
