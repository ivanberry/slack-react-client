import React from 'react';
import { withFormik } from 'formik';
import { findIndex } from 'lodash';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  teamId
}) => (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Create a new channel?</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Channel name..."
              fluid
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Button disabled={isSubmitting} onClick={onClose} fluid>
              Cancel
          </Button>
            <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
              Create
          </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );

AddChannelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (
      values,
      { props: { teamId, mutate, onClose }, setSubmitting },
    ) => {
      await mutate({
        variables: { teamId, name: values.name },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) return;
          const data = store.readQuery({ query: allTeamsQuery });
          const { allTeams } = data;
          const teamIdx = findIndex(allTeams, team => team.id === teamId);
          allTeams[teamIdx].channels.push(channel);
          store.writeQuery({
            query: allTeamsQuery,
            data,
          });
        },
      });
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);
