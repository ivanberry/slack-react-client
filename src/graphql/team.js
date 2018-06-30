import gql from 'graphql-tag';

/* eslint-disable */
export const meQuery = gql`
  {
    me {
      id
      username
      teams {
        id
        name
        owner
        channels {
          id
          name
        }
      }
    }
  }
`;
