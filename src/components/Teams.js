import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: blink;
`;

/*eslint-disable  */
const team = ({ id, name }) => <li key={`team-${id}`}>{name}</li>;

const Teams = ({ teams }) => (
  <TeamWrapper>
    <ul>{teams.map(team)}</ul>
  </TeamWrapper>
);

Teams.propTypes = {
  teams: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Teams;
