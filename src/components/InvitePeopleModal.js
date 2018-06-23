import React from 'react';
import { withFormik } from 'formik';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const InvitePeopleModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Invite Friend</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="User's email"
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

InvitePeopleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const invitePeopleMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(invitePeopleMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (
      values,
      { props: { teamId, mutate, onClose }, setSubmitting },
    ) => {
      await mutate({
        variables: { teamId, email: values.email },
      });
      onClose();
      setSubmitting(false);
    },
  }),
)(InvitePeopleModal);
