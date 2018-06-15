import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  background-color: yellow;
`;

export default ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message #${channelName}`} />
  </SendMessageWrapper>
);
