import React from 'react';
import { Comment } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) =>
  loading ? null : (
    <Messages>
      <Comment.Group>
        {messages.map((m) => (
          <Comment key={`commect-${m.id}`}>
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{m.created_at}</div>
              </Comment.Metadata>
              <Comment.Text>{m.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Messages>
  );

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

MessageContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    messages: PropTypes.array,
  }).isRequired,
};

export default graphql(messagesQuery, {
  variables: (props) => ({
    channelId: props.channelId,
  }),
})(MessageContainer);
