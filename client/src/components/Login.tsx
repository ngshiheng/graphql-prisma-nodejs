import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Button, TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const LoginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export class Login extends React.PureComponent<RouteComponentProps<{}>> {
    state = {
        email: '',
        password: '',
    };

    handleChange = (event: any) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { password, email } = this.state;
        return (
            <Mutation mutation={LoginMutation}>
                {(mutate: any) => (
                    <div>
                        <div>
                            <TextField
                                type="email"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <Button
                            onClick={async () => {
                                const response = await mutate({
                                    variables: this.state,
                                });
                                console.log(response);
                            }}
                        >
                            Login
                        </Button>
                    </div>
                )}
            </Mutation>
        );
    }
}
