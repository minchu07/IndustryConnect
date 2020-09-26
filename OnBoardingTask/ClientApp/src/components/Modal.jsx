import React, { Component } from 'react';
import { Button, Form, Icon, Header, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';
import FormComponent from './FormComponent';

export default class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
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
          <Modal.Header> {this.props.header} </Modal.Header>
          <Modal.Content>{this.props.children}</Modal.Content>
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
