import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, name: '', price: '' };
  }
  componentDidMount() {
    console.log(this.props);
  }
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
            <label>Price</label>
            <Form.Input
              type="number"
              onChange={(e) =>
                this.setState({
                  price: e.target.value,
                })
              }
              placeholder="0.00"
              value={this.state.price}
              required
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
