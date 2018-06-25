import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import client from './apollo';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
