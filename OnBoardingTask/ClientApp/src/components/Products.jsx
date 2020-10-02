import React, { Component } from 'react';
import {
  Table,
  Button,
  Icon,
  Container,
  Header,
  Grid,
  Pagination,
} from 'semantic-ui-react';
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
      page: 1,
      itemsPerPage: 1,
    };
  }
  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };
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
    fetch('/Products/GetProduct')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error('Error:', error);
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
    const itemsPerPage = 10;
    const { page } = this.state;
    const totalPages = items.length / itemsPerPage;
    const data = items.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );
    return (
      <div>
        <br />
        <Container>
          <Grid>
            <Grid.Row>
              <Header as="h3" content="Product Details" textAlign="left" />
            </Grid.Row>
            <Grid.Row>
              <Button primary onClick={() => this.handleOpen()}>
                New Record
              </Button>
            </Grid.Row>

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
            />
            <Grid.Row>
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
                  {data.map((item) => {
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
            </Grid.Row>
            <Grid.Row>
              <Pagination
                activePage={page}
                totalPages={totalPages}
                siblingRange={1}
                onPageChange={this.setPageNum}
              />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
