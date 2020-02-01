import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './Routes';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
