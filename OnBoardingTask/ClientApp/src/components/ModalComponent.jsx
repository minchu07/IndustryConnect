import React, { Component } from 'react';
import { Button, Form, Icon, Header, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';
import FormComponent from './FormComponent';

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  static getDerivedStateFromProps(props) {
    console.log(props);
    return { ...props };
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={() => {
            this.props.onClose();
          }}
          size="small"
        >
          <Modal.Header> Create Customer </Modal.Header>
          <Modal.Content>
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
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon
              labelPosition="left"
              negative
              onClick={() => this.props.onClose()}
            >
              <Icon name="cancel" />
              Cancel
            </Button>
            <Button
              icon
              labelPosition="right"
              positive
              type="submit"
              form="form"
            >
              <Icon name="arrow right" />
              Submit
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
