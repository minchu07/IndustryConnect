import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import EditCustomer from './EditCustomer';
// import ButtonModal from './ButtonModal';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formdata: [],
      show: false,
      editmodal: false,
      deleteshow: false,
      name: '',
      address: '',
      id: '',
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, editmodal: false });
  };

  hideEditModal = () => {
    this.setState({ editmodal: false });
  };

  handleInsert = (name, address) => {
    const data = {
      Name: name,
      Address: address,
    };

    fetch('/Customers/PostCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.getCustomerDetails();
        this.setState({
          data: result.data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  handleDelete = (id) => {
    console.log(id);
    fetch('/Customers/DeleteCustomer/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.getCustomerDetails();
        this.setState({
          data: result.data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleEdit = (name, address) => {
    const data = {
      Id: this.state.details.id,
      Name: name,
      Address: address,
    };

    fetch('/Customers/PutCustomer/' + this.state.details.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        this.getCustomerDetails();
        this.setState({
          data: result.data,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  getCustomerDetails = () => {
    fetch('/Customers/GetCustomer')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  componentDidMount = () => {
    this.getCustomerDetails();
  };
  onEditAction = (details) => {
    console.log(details);
    this.setState({ editmodal: true, details: details });
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
        ></ModalComponent>
        <EditCustomer
          open={this.state.editmodal}
          onClose={this.hideEditModal}
          onSubmit={this.handleEdit}
          details={this.state.details}
        />
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
            {items.map((item, key) => {
              console.log(item.id);
              return (
                <Table.Row key={key}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
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
