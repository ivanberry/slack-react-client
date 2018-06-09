import React from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import ReactDOM from 'react-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
});

client
    .query({
        query: gql`
            {
                allUsers {
                    id
                }
            }
        `,
    })
    .then((result) => console.log(result));

const App = <Routes />;

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
