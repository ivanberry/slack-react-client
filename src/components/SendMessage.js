import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { compose, withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  background-color: yellow;
`;

const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <SendMessageWrapper>
    <Input
      name="message"
      value={values.message}
      fluid
      placeholder={`Message #${channelName}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.keyCode === 13 && isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </SendMessageWrapper>
);

SendMessage.propTypes = {
  channelName: PropTypes.string.isRequired,
};

const createMessageMutaion = gql``;

export default compose(
  graphql(createMessageMutaion),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting },
    ) => {
      if (!values.message && !values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: { channelId, text: values.message },
      });
      setSubmitting(false);
    },
  }),
)(SendMessage);
