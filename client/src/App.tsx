import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PrivatePage } from './components/PrivatePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { PageNotFound } from './components/PageNotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

export class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ProtectedRoute exact path="/" component={HomePage} />
                    <ProtectedRoute path="/private" component={PrivatePage} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}
