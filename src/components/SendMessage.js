import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const SendMessageWrapper = styled.div`
  margin: 20px;
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
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </SendMessageWrapper>
);

SendMessage.propTypes = {
  channelName: PropTypes.string.isRequired,
};

const createMessageMutaion = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutaion),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (
      values,
      { props: { channelId, mutate }, setSubmitting, resetForm },
    ) => {
      if (!values.message && !values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: { channelId, text: values.message },
      });
      resetForm(false);
    },
  }),
)(SendMessage);
