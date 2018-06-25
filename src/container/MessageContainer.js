import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) =>
  loading ? null : <Messages>{JSON.stringify(messages)}</Messages>;

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;

MessageContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
  }).isRequired,
};

export default graphql(messagesQuery, {
  variables: (props) => ({
    channelId: props.channelId,
  }),
})(MessageContainer);
