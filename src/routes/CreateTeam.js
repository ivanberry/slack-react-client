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

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { name } = this;
    const response = await this.props.mutate({
      variables: { name },
    });

    const { ok, errors } = response.data.createTeam;

    if (ok) {
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
      name,
      onSubmit,
      onChange,
      errors: { nameError },
    } = this;

    const errorsList = [];
    if (nameError) {
      errorsList.push(nameError);
    }

    return (
      <Container fluid>
        <Header as="h2">Create a team</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label htmlFor="name">Create a team</label>
            <Input
              id="name"
              type="name"
              value={name}
              placeholder="name"
              onChange={onChange}
              name="name"
            />
          </Form.Field>
          <Button primary>Create</Button>
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

CreateTeam.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  mutate: PropTypes.func.isRequired,
};

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));
