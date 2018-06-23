import gql from 'graphql-tag';

/* eslint-disable */
export const allTeamsQuery = gql`
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
