import React, { Component } from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => this.props.mutate({ variables: this.state });

  render() {
    const { onChange, onSubmit, state } = this;
    return (
      <Container fluid>
        <Header>Register Page</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              id="name"
              type="text"
              placeholder="username"
              onChange={onChange}
              value={state.user}
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={state.email}
              placeholder="example@example.com"
              onChange={onChange}
              name="email"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={state.password}
              placeholder="password"
              onChange={onChange}
              name="password"
            />
          </Form.Field>
          <Button primary>Register</Button>
        </Form>
      </Container>
    );
  }
}

const registerMutaion = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutaion)(Register);
