import React, { Component } from 'react';
import {
  Button,
  Form,
  Dropdown,
  Icon,
  Header,
  Image,
  Modal,
} from 'semantic-ui-react';

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      customerList: [],
      productList: [],
      storesList: [],
      productsId: 0,
      customerId: 0,
      storeId: 0,
      dateSold: '',
    };
  }
  componentDidMount = () => {
    console.log(this.props);
  };

  render() {
    if (this.props.type === 'Edit') {
      return (
        <div>
          <Form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.onSubmit(this.state.name, this.state.address);
              this.props.onClose();
            }}
          >
            <Form.Field required>
              <label>Name</label>
              <Form.Input
                onChange={(e) => this.setState({ name: e.target.value })}
                placeholder="Name"
                value={this.state.name}
                required
              />
            </Form.Field>
            <Form.Field required>
              <label>Address</label>
              <Form.Input
                onChange={(e) =>
                  this.setState({
                    address: e.target.value,
                  })
                }
                placeholder="Address"
                value={this.state.address}
                required
              />
            </Form.Field>
          </Form>
        </div>
      );
    } else if (this.props.type === 'Create') {
      return (
        <div>
          <Form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.onSubmit(
                this.state.customerId,
                this.state.productsId,
                this.state.storeId,
                this.state.dateSold
              );
            }}
          >
            <Form.Field required>
              <label>Customer Name</label>
              <Dropdown
                placeholder="Customer"
                fluid
                search
                selection
                options={this.props.customers}
                value={this.props.customers.key}
                onChange={(e, { value }) => {
                  this.setState({
                    customerId: value,
                  });
                }}
              />
            </Form.Field>
            <Form.Field required>
              <label>Product Name</label>
              <Dropdown
                placeholder="Product"
                fluid
                search
                selection
                options={this.props.products}
                value={this.props.products.key}
                onChange={(e, { value }) => {
                  this.setState({
                    productsId: value,
                  });
                }}
              />
            </Form.Field>
            <Form.Field required>
              <label>Store Name</label>
              <Dropdown
                placeholder="Store"
                fluid
                search
                selection
                options={this.props.stores}
                value={this.props.stores.key}
                onChange={(e, { value }) => {
                  console.log('value of store ' + value);
                  this.setState({
                    storeId: value,
                  });
                }}
              />
            </Form.Field>
            <Form.Field required>
              <label>Date Sold</label>
              <Form.Input
                type="date"
                data-date-format="yyyy-mm-dd"
                onChange={(e) =>
                  this.setState({
                    dateSold: e.target.value,
                  })
                }
                placeholder="Date Sold"
                value={this.state.dateSold}
                required
              />
            </Form.Field>
          </Form>
        </div>
      );
    }
  }
}
