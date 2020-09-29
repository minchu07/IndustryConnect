import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, name: '', price: '' };
  }
  componentDidMount() {
    this.setState({ name: this.state.item.name, price: this.state.item.price });
  }
  handleChange = (e) => {
    e.persist();

    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSubmit(this.state.name, this.state.price);
          }}
        >
          <Form.Field>
            <label>Name</label>
            <Form.Input
              name="name"
              onChange={this.handleChange}
              placeholder="Name"
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Form.Input
              name="price"
              onChange={this.handleChange}
              placeholder="0.00"
              value={this.state.price}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
