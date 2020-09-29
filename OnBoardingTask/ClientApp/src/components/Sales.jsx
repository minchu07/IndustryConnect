import React, { Component } from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import Modal from './Modal';
import FormComponent from './FormComponent';
import EditSales from './EditSales';
import DeletModal from './DeleteModal';
export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      show: false,
      customerList: [],
      productList: [],
      storeList: [],
      customers: [],
      products: [],
      stores: [],
      editmodal: '',
      deletemodal: '',
      id: '',
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  fetchSalesDetails() {
    console.log('data');
    fetch('/Sales/GetSales')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  componentDidMount = () => {
    this.fetchSalesDetails();
    this.getDetails();
  };

  getDetails = () => {
    fetch('/Customers/GetCustomer')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        let customers = [];
        data.forEach((c) => {
          customers.push({
            key: c.id,
            value: c.id,
            text: c.name,
          });
        });
        this.setState({ customerList: customers });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch('/Products/GetProduct')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        let products = [];
        data.forEach((p) => {
          products.push({
            key: p.id,
            value: p.id,
            text: p.name,
          });
        });
        this.setState({ productList: products });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    fetch('/Stores/GetStore')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        let stores = [];
        data.forEach((s) => {
          stores.push({
            key: s.id,
            value: s.id,
            text: s.name,
          });
        });
        this.setState({ storeList: stores });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleInsert = (custId, prodId, storeId, dateSold) => {
    const data = {
      ProductId: prodId,
      CustomerId: custId,
      StoreId: storeId,
      DateSold: dateSold,
    };
    console.log('data' + prodId + 'store' + storeId);

    fetch('/Sales/PostSales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchSalesDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideModal();
  };

  handleEdit = (custId, prodId, storeId, dateSold) => {
    const data = {
      ProductId: prodId,
      CustomerId: custId,
      StoreId: storeId,
      DateSold: dateSold,
    };
    console.log('data' + prodId + 'store' + storeId);

    fetch('/Sales/PutSales', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchSalesDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideModal();
  };

  handleDelete = () => {
    fetch('/Sales/DeleteSales/' + this.state.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        this.fetchSalesDetails();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    this.hideDeleteModal();
  };

  onEditAction = (details) => {
    this.setState({ editmodal: true, details: details });
  };
  hideEditModal = () => {
    this.setState({ editmodal: false });
  };
  onDeleteAction = (id) => {
    this.setState({ deletemodal: true, id: id });
  };
  hideDeleteModal = () => {
    this.setState({ deletemodal: false });
  };

  render() {
    let items = this.state.data;
    return (
      <div>
        <Button
          primary
          onClick={() => {
            this.showModal();
          }}
        >
          New Record
        </Button>
        <Modal
          open={this.state.show}
          onClose={this.hideModal}
          header={'Add Sales Details'}
        >
          <FormComponent
            type="Create"
            onSubmit={this.handleInsert}
            products={this.state.productList}
            customers={this.state.customerList}
            stores={this.state.storeList}
          ></FormComponent>
        </Modal>
        <Modal
          open={this.state.editmodal}
          onClose={this.hideEditModal}
          header={'Edit Sales Details'}
        >
          <EditSales
            type="Edit"
            onSubmit={this.handleEdit}
            products={this.state.productList}
            customers={this.state.customerList}
            stores={this.state.storeList}
            item={this.state.details}
          ></EditSales>
        </Modal>

        <DeletModal
          openmodal={this.state.deletemodal}
          onClose={this.hideDeleteModal}
          header={'Delete Store Details'}
          onDelete={this.handleDelete}
        >
          <div>Sales details will be deleted</div>
        </DeletModal>

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
                <Table.Row key={item.id}>
                  <Table.Cell>{item.customer.name}</Table.Cell>
                  <Table.Cell>{item.product.name}</Table.Cell>
                  <Table.Cell>{item.store.name}</Table.Cell>
                  <Table.Cell>{item.dateSold}</Table.Cell>
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
      </div>
    );
  }
}
