import React, { Component } from 'react';
import { Table, Button, Icon, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import Modal from './Modal';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import DeleteModal from './DeleteModal';

export default class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      name: '',
      address: '',
      deletemodal: false,
      id: 0,
      rowDetails: '',
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
  componentDidMount() {
    console.log('data');
    this.fetchStoreDetails();
  }

  fetchStoreDetails = () => {
    axios
      .get('/Stores/GetStore')
      .then((result) => {
        this.setState({
          data: result.data,
        });
        console.log(result.data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  };

  handleInsert = (name, address) => {
    const data = {
      Name: name,
      Address: address,
    };

    fetch('/Stores/PostStore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchStoreDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.handleClose();
  };

  onDeleteAction = (id) => {
    this.setState({ deletemodal: true, id: id });
    console.log(this.state.deletemodal);
  };

  handleDelete = () => {
    fetch('/Stores/DeleteStore/' + this.state.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchStoreDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideDeleteModal();
  };

  handleEdit = (name, address) => {
    const data = {
      Id: this.state.rowDetails.id,
      Name: name,
      Address: address,
    };

    fetch('/Stores/PutStore/' + this.state.rowDetails.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        this.fetchStoreDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideEditModal();
  };

  hideDeleteModal = () => {
    this.setState({ deletemodal: false });
  };

  onEditAction = (details) => {
    console.log('OnEdit' + details);
    this.setState({ editmodal: true, rowDetails: details });
  };
  hideEditModal = () => {
    this.setState({ editmodal: false });
  };

  render() {
    let items = this.state.data;
    return (
      <div>
        <br />
        <Container>
          <Header as="h3" content="Store Records" textAlign="left" />
          <Button primary onClick={() => this.handleOpen()}>
            New Record
          </Button>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            header={'Add Store'}
          >
            <CreateForm
              //  type="Create"
              onSubmit={this.handleInsert}
            ></CreateForm>
          </Modal>
          <Modal
            open={this.state.editmodal}
            onClose={this.hideEditModal}
            header={'Edit Store Details'}
          >
            <EditForm
              type="Edit"
              onSubmit={this.handleEdit}
              rowData={this.state.rowDetails}
            ></EditForm>
          </Modal>
          <DeleteModal
            openmodal={this.state.deletemodal}
            onClose={this.hideDeleteModal}
            header={'Delete Store Details'}
            onDelete={this.handleDelete}
          >
            <div>Store details will be deleted</div>
          </DeleteModal>
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
                  <Table.Row key={item.id}>
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
                        onClick={() => this.onDeleteAction(item.id)}
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
        </Container>
      </div>
    );
  }
}
