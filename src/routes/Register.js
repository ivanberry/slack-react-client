import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Header,
  Message,
  Input,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const { username, password, email } = this.state;
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });
    const response = await this.props.mutate({
      variables: { username, email, password },
    });
    const { ok, errors } = response.data.register;
    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  };

  render() {
    const { onChange, onSubmit, state } = this;

    const { usernameError, passwordError, emailError } = state;

    // TODO: maybe there is better way to handle erros
    const errorsList = [];
    if (usernameError) {
      errorsList.push(usernameError);
    }
    if (emailError) {
      errorsList.push(emailError);
    }
    if (passwordError) {
      errorsList.push(passwordError);
    }

    return (
      <Container fluid>
        <Header>Register Page</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <Input
              error={!!usernameError}
              id="username"
              type="text"
              placeholder="username"
              onChange={onChange}
              value={state.user}
              name="username"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">Email</label>
            <Input
              error={!!emailError}
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
            <Input
              error={!!passwordError}
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
        {!!usernameError || !!passwordError || !!emailError ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorsList}
          />
        ) : null}
      </Container>
    );
  }
}

const registerMutaion = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutaion)(Register);
