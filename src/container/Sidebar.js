import React, { Component } from 'react';
import decode from 'jwt-decode';
import PropTypes from 'prop-types';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
  };

  handleAddChannelClick = () => {
    this.setState({
      openAddChannelModal: true,
    });
  };

  handleCloseChannelClick = () => {
    this.setState({
      openAddChannelModal: false,
    });
  };

  render() {
    const { teams, team } = this.props;

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);

      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (error) {}

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channel-sidebar"
        teamName={team.name}
        teamId={team.id}
        username={username}
        channels={team.channels}
        users={[
          { id: 1, name: 'tab' },
          { id: 2, name: 'shriting' },
          { id: 3, name: 'amy' },
        ]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseChannelClick}
        open={this.state.openAddChannelModal}
        key="sidebar-add-channel"
      />,
    ];
  }
}

Sidebar.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      letter: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar; // why shoud we use curry?
