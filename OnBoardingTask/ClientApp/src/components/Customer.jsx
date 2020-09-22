import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
// import ButtonModal from './ButtonModal';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formdata: [],
      show: false,
      editshow: false,
      deleteshow: false,
      name: '',
      address: '',
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleInsert = (name, address) => {
    const data = {
      Name: name,
      Address: address,
      details: { name: '', address: '' },
    };

    fetch('/Customers/PostCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  handleEdit = () => {};

  handleDelete = () => {};

  componentDidMount() {
    console.log('data');

    axios
      .get('/Customers/GetCustomer')
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
  onEditAction = (id) => {
    console.log(id);
    this.setState({ show: true, details: id });
  };

  render() {
    let items = this.state.data;
    return (
      <div>
        <Button primary onClick={() => this.showModal()}>
          New Customer
        </Button>
        <ModalComponent
          open={this.state.show}
          onClose={this.hideModal}
          onSubmit={this.handleInsert}
          details={this.state.details}
        ></ModalComponent>
        <Table celled fixed singleLine compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => {
              console.log(item);
              return (
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      color="yellow"
                      onClick={(item) => this.onEditAction(item.id)}
                    >
                      <Icon name="edit" />
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      color="red"
                      onClick={() => this.handleDelete()}
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
