import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      productList: [],
      storesList: [],
      productsId: 0,
      customerId: 0,
      storeId: 0,
      dateSold: '',
    };
  }

  render() {
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
              value={this.props.customers.value}
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
              value={this.props.products.value}
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
              value={this.props.stores.value}
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
