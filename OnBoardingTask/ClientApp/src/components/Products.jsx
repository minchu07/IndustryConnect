import React, { Component } from 'react';
import { Table, Button, Icon, Container, Header } from 'semantic-ui-react';
import axios from 'axios';
import Modal from './Modal';
import AddProduct from './AddProduct';
import DeleteModal from './DeleteModal';
import EditProduct from './EditProduct';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      open: false,
      deletemodal: false,
      id: 0,
      type: '',
      editmodal: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      type: 'Create',
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
    console.log(data);
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

  handleEdit = (name, price) => {
    const data = {
      Id: this.state.item.id,
      Name: name,
      Price: price,
    };
    console.log(data);
    fetch('/Products/PutProduct/' + this.state.item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        this.fetchProductDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.closeEditModal();
  };
  handleDelete = () => {
    fetch('/Products/DeleteProduct/' + this.state.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchProductDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideDeleteModal();
  };

  hideDeleteModal = () => {
    this.setState({ deletemodal: false });
  };
  closeEditModal = () => {
    this.setState({ editmodal: false });
  };

  onDeleteAction = (id) => {
    this.setState({ deletemodal: true, id: id });
    console.log(this.state.deletemodal);
  };

  onEditAction = (item) => {
    console.log(item);
    this.setState({ editmodal: true, item: item, type: 'edit' });
  };

  render() {
    let items = this.state.data;
    return (
      <div>
        <br />
        <Container>
          <Header as="h3" content="Product Details" textAlign="left" />
          <Button primary onClick={() => this.handleOpen()}>
            New Record
          </Button>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            header={'Add Products'}
          >
            <AddProduct
              type={this.state.type}
              item={this.state.item}
              onSubmit={this.handleInsert}
            ></AddProduct>
          </Modal>
          <Modal
            open={this.state.editmodal}
            onClose={this.closeEditModal}
            header={'Edit Product Details'}
          >
            <EditProduct
              type={this.state.type}
              item={this.state.item}
              onSubmit={this.handleEdit}
            ></EditProduct>
          </Modal>
          <DeleteModal
            openmodal={this.state.deletemodal}
            onClose={this.hideDeleteModal}
            header={'Delete Product Details'}
            onDelete={this.handleDelete}
          >
            <div>Product details will be deleted</div>
          </DeleteModal>
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
