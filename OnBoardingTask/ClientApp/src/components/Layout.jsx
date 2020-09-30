import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Container, Header } from 'semantic-ui-react';
import NavBar from './NavBar';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>{this.props.children}</Row>
          <br />
          <Row>
            <Header as="h4">&copy; 2020 - Minchu Baby</Header>
          </Row>
        </Container>
      </div>
    );
  }
}
