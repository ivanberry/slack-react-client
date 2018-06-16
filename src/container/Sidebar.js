import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import decode from 'jwt-decode';
import { findIndex } from 'lodash';

import Channels from '../components/Channels';
import Teams from '../components/Teams';

const Sidebar = ({ data: { allTeams, loading }, currentTeamId }) => {
  if (loading) return null;
  const teamIdx = findIndex(allTeams, ['id', currentTeamId]);
  const team = allTeams[teamIdx];
  let username = '';
  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);

    // eslint-disable-next-line prefer-destructuring
    username = user.username;
  } catch (error) {}

  return [
    <Teams
      key="team-sidebar"
      teams={allTeams.map((t) => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channel-sidebar"
      teamName={team.name}
      username={username}
      channels={team.channels}
      users={[
        { id: 1, name: 'tab' },
        { id: 2, name: 'shriting' },
        { id: 3, name: 'amy' },
      ]}
    >
      Channels
    </Channels>,
  ];
};

const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;

export default graphql(allTeamsQuery)(Sidebar); // why shoud we use curry?
