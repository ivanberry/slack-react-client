import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: green;
`;

/* eslint-disable */
const channel = ({ id, name }) => <li key={`channel-${id}`}>#{name}</li>;
const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

const Channels = ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <div>
      {teamName}
      <br />
      {username}
    </div>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(channel)}
      </ul>
    </div>
    <div>
      <ul>
        <li>Users</li>
        {users.map(user)}
      </ul>
    </div>
  </ChannelWrapper>
);

Channels.propTypes = {
  teamName: PropTypes.string.isRequired,
  users: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  channels: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Channels;
