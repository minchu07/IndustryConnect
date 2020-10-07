import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
export default class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Header as="h1" textAlign="left">
                React
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header as="h3" textAlign="left">
                {' '}
                Welcome to your new single-page application
              </Header>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
