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
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import DeleteModal from './DeleteModal';

export default class Stores extends Component {
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
    fetch('/Stores/GetStore')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  setErrorMessage = () => {};
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
              <Header as="h3" content="Store Records" textAlign="left" />
            </Grid.Row>
            <Grid.Row>
              <Button primary onClick={() => this.handleOpen()}>
                New Store
              </Button>
            </Grid.Row>
            <Modal
              open={this.state.open}
              onClose={this.handleClose}
              header={'Create Store'}
            >
              <CreateForm onSubmit={this.handleInsert}></CreateForm>
            </Modal>
            <Modal
              open={this.state.editmodal}
              onClose={this.hideEditModal}
              header={'Edit Store'}
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
              header={'Delete Store'}
              onDelete={this.handleDelete}
            />
            <Grid.Row>
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
                  {data.map((item) => {
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
