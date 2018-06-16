import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';
const SideBarListItem = styled.li`
  ${paddingLeft};
  &:hover {
    background-color: #3e313c;
  }
`;

const SideBarListHeader = styled.h1`
  ${paddingLeft};
`;
const PushLeft = styled.div`
  ${paddingLeft};
`;
const Green = styled.span`
  color: #38978d;
`;

/* eslint-disable */
const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');
const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}>#{name}</SideBarListItem>
);
const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

const Channels = ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>Channels</SideBarListHeader>
        {channels.map(channel)}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Users</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
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
