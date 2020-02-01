import React from 'react';
import { Login } from './components/Login';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
    return (
        <Login
            onSubmit={({ email, password }) => {
                console.log(email, password);
            }}
        />
    );
};

export default App;
