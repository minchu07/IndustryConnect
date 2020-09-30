import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, name: '', address: '' };
  }
  componentDidMount() {
    this.setState({
      name: this.state.rowData.name,
      address: this.state.rowData.address,
    });
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
            this.props.onSubmit(this.state.name, this.state.address);
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
            <label>Address</label>
            <Form.Input
              name="address"
              onChange={this.handleChange}
              placeholder="Address"
              value={this.state.address}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
