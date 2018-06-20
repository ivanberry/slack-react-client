import React from 'react';
import { withFormik } from 'formik';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
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

export default withFormik({
  mapPropsToValues: () => ({ name: '' }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values, props);
    console.log('submitting...');
    setSubmitting(false);
  },
})(AddChannelModal);