import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  background-color: yellow;
`;

const SendMessage = ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message #${channelName}`} />
  </SendMessageWrapper>
);

SendMessage.propTypes = {
  channelName: PropTypes.string.isRequired,
};

export default SendMessage;
