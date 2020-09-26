import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

export default class DeleteModal extends Component {
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
          <Modal.Content>
            <div>Are you Sure?</div>
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
              onClick={() => this.props.onDelete()}
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
