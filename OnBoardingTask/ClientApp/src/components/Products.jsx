import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
// import ModalForm from './ModalForm';
// import ButtonModal from './ButtonModal';

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
  handleClose = () => {
    this.setState({
      isopen: false,
    });
  };
  componentDidMount() {
    console.log('data');

    axios
      .get('/Customers/GetProducts')
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
        {/* <ModalForm openvalue={this.state.isopen} /> */}
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
              return (
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
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
