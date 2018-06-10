import React, { Component } from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    console.log(this.state);
  };

  render() {
    const { onChange, onSubmit, state } = this;
    return (
      <Container fluid>
        <Header>Register Page</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              placeholder="username"
              onChange={onChange}
              value={state.user}
              name="name"
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
              placeholder="username"
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

export default Register;
