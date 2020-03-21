import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'https://movie-booking-back.herokuapp.com/graphql'
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const client = new ApolloClient({
  link: httpLink,
  cache: cache
});

ReactDOM.render(
<ApolloProvider client= {client} >
  <App />
  </ApolloProvider>,
document.getElementById('root'),
);

serviceWorker.unregister();
