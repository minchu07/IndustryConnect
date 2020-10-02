import React, { Component } from 'react';
import {
  Table,
  Button,
  Icon,
  Header,
  Container,
  Pagination,
  Grid,
} from 'semantic-ui-react';
import EditForm from './EditForm';
import DeleteModal from './DeleteModal';
import Modal from './Modal';
import CreateForm from './CreateForm';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      formdata: [],
      show: false,
      editmodal: false,
      deletemodal: false,
      name: '',
      address: '',
      id: '',
      rowDetails: '',
      page: 2,
      itemsPerPage: 10,
      url: 'https://mvponboardingtask.azurewebsites.net',
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

  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideModal();
  };
  handleDelete = () => {
    fetch('/Customers/DeleteCustomer/' + this.state.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response)
      .then((result) => {
        console.log('Success:', result);
        this.getCustomerDetails();
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

    fetch('/Customers/PutCustomer/' + this.state.rowDetails.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log('Success:', result);
        this.getCustomerDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideEditModal();
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
    console.log('OnEdit' + details);
    this.setState({ editmodal: true, rowDetails: details });
  };
  onDeleteAction = (id) => {
    this.setState({ deletemodal: true, id: id });
    console.log(this.state.deletemodal);
  };

  hideDeleteModal = () => {
    this.setState({ deletemodal: false });
  };
  hideEditModal = () => {
    this.setState({ editmodal: false });
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
              <Header as="h3" content="Customer Records" textAlign="left" />
            </Grid.Row>
            <Grid.Row>
              <Button primary onClick={() => this.showModal()}>
                New Customer
              </Button>
            </Grid.Row>
            <Modal
              open={this.state.show}
              onClose={this.hideModal}
              header={'Add Customer'}
            >
              <CreateForm onSubmit={this.handleInsert}></CreateForm>
            </Modal>
            <Modal
              open={this.state.editmodal}
              onClose={this.hideEditModal}
              header={'Edit Customer Details'}
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
              header={'Delete Customer Details'}
              onDelete={this.handleDelete}
            />
            <Grid.Row>
              <Table celled singleLine compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.map((item) => {
                    console.log(item);
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
