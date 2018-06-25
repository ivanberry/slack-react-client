import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';

import { findIndex } from 'lodash';
import Header from '../components/Header';
import MessageContainer from '../container/MessageContainer';
import AppyLayout from '../components/AppLayout';
import SendMessage from '../components/SendMessage';
import Sidebar from '../container/Sidebar';
import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({
  data: { allTeams, inviteTeams, loading },
  match: {
    params: { teamId, channelId },
  },
}) => {
  if (loading) {
    return null;
  }

  const teams = [...allTeams, ...inviteTeams];

  if (!teams.length) {
    return <Redirect to="/create-team" />;
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
  const team = teams[teamIdx];

  const channelIdInteger = parseInt(channelId, 10);
  const currentChannelIdx = channelIdInteger
    ? findIndex(team.channels, ['id', channelIdInteger])
    : 0;
  const channel = team.channels[currentChannelIdx];

  return (
    <AppyLayout clasName="app-layout">
      <Sidebar
        teams={teams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      <Header channelName={channel.name} />
      <MessageContainer channelId={channel.id} />
      <SendMessage channelId={channel.id} channelName={channel.name} />
    </AppyLayout>
  );
};

ViewTeam.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    teams: PropTypes.array,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default graphql(allTeamsQuery)(ViewTeam); // why shoud we use curry?
