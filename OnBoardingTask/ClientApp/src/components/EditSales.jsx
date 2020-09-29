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

export default class EditSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      name: '',
      address: '',
      customerList: [],
      productList: [],
      storesList: [],
      productId: 0,
      customerId: 0,
      storeId: 0,
      dateSold: '',
    };
  }
  componentDidMount = () => {
    console.log(this.state.item.dateSold);
    this.setState({
      customerId: this.state.item.customerId,
      productId: this.state.item.productId,
      storeId: this.state.item.storeId,
      dateSold: this.state.item.dateSold,
    });
  };

  updateStateValues = () => {
    console.log(this.props);
    //this.setState({ ...this.props });
  };
  handleChange = (e) => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.type === 'Edit') {
      return (
        <div>
          <Form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              this.props.onSubmit(
                this.state.customerId,
                this.state.productId,
                this.state.storeId,
                this.state.dateSold
              );
            }}
          >
            <Form.Field>
              <label>Customer Name</label>
              <Dropdown
                name="customerId"
                placeholder="Customer"
                fluid
                search
                selection
                options={this.props.customers}
                value={this.state.customerId}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Product Name</label>
              <Dropdown
                name="productId"
                placeholder="Product"
                fluid
                search
                selection
                options={this.props.products}
                value={this.state.productId}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Store Name</label>
              <Dropdown
                name="storeId"
                placeholder="Store"
                fluid
                search
                selection
                options={this.props.stores}
                value={this.state.storeId}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Date Sold</label>
              <Form.Input
                name="dateSold"
                type="date"
                onChange={this.handleChange}
                placeholder="Date Sold"
                value={this.state.dateSold}
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
