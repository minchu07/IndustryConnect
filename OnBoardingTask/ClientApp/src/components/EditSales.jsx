import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

export default class EditSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      name: '',
      address: '',
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
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  render() {
    let dateTemp = new Date(this.state.dateSold);
    let monthTemp =
      dateTemp.getMonth() + 1 < 10
        ? '0' + (dateTemp.getMonth() + 1)
        : dateTemp.getMonth() + 1;
    let day =
      dateTemp.getDate() < 10 ? '0' + dateTemp.getDate() : dateTemp.getDate();
    let date = dateTemp.getFullYear() + '-' + monthTemp + '-' + day;
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
            <label>Date Sold</label>
            <Form.Input
              name="dateSold"
              type="date"
              onChange={this.handleChange}
              placeholder="Date Sold"
              value={date}
            />
          </Form.Field>
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
        </Form>
      </div>
    );
  }
}
