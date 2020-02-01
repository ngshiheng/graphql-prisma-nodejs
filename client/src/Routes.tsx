import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';

export class Routes extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}
