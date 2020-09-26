import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class AddStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
    };
  }

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
  }
}
