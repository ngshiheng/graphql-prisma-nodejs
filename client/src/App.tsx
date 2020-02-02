import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PrivatePage } from './components/PrivatePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

export class App extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/private" component={PrivatePage} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                </Switch>
            </BrowserRouter>
        );
    }
}
