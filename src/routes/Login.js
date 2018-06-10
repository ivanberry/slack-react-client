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
import { observer } from 'mobx-react';

export default observer(
  class Login extends Component {
    constructor(props) {
      super(props);
      extendObservable(this, {
        email: '',
        password: '',
      });
    }

    onSubmit = () => {
      const { email, password } = this;
      console.log(email, password);
    };

    onChange = (e) => {
      const { name, value } = e.target;
      this[name] = value;
    };

    render() {
      const { email, password, onSubmit, onChange } = this;
      return (
        <Container fluid>
          <Header as="h2">Login</Header>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <Input
                // error={!!emailError}
                id="email"
                type="text"
                value={email}
                placeholder="example@example.com"
                onChange={onChange}
                name="email"
              />
            </Form.Field>
            <Form.Field>
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
          {/* {!!usernameError || !!passwordError || !!emailError ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorsList}
            />
          ) : null} */}
        </Container>
      );
    }
  },
);
