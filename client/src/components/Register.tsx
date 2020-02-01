import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Button, TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

const CreateUserMutation = gql`
    mutation CreateUserMutation($email: String!, $password: String!) {
        createUser(input: { email: $email, password: $password }) {
            token
        }
    }
`;

export class Register extends React.PureComponent<RouteComponentProps<{}>> {
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
            <Mutation mutation={CreateUserMutation}>
                {(mutate: any) => (
                    <div>
                        <div>
                            <TextField
                                type="email"
                                name="email" // Note: name has to match state
                                placeholder="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                name="password" // Note: name has to match state
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
                                this.props.history.push('/login');
                            }}
                        >
                            Register
                        </Button>
                    </div>
                )}
            </Mutation>
        );
    }
}
