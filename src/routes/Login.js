import React, { Component } from 'react';
import {
  Form,
  Button,
  Container,
  Header,
  Message,
  Input,
} from 'semantic-ui-react';
import { extendObservable } from 'mobx';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    const { ok, token, refreshToken, errors } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const {
      email,
      password,
      onSubmit,
      onChange,
      errors: { emailError, passwordError },
    } = this;

    const errorsList = [];
    if (emailError) {
      errorsList.push(emailError);
    }

    if (passwordError) {
      errorsList.push(passwordError);
    }

    return (
      <Container fluid>
        <Header as="h2">Login</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field error={!!emailError}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="text"
              value={email}
              placeholder="example@example.com"
              onChange={onChange}
              name="email"
            />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <label htmlFor="password">Password</label>
            <Input
              // error={!!passwordError}
              id="password"
              type="password"
              value={password}
              placeholder="password"
              onChange={onChange}
              name="password"
            />
          </Form.Field>
          <Button primary>Login</Button>
        </Form>
        {errorsList.length ? (
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  mutate: PropTypes.func.isRequired,
};

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
