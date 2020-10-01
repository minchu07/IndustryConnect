import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import NavBar from './NavBar';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Grid>
            <Grid.Row>{this.props.children}</Grid.Row>
            <Grid.Row>
              <Header as="h4">&copy; 2020 - Minchu Baby</Header>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
