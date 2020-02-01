import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';

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
        confirmPassword: '',
        validEmail: false,
        validPasswords: false,
    };

    handleChange = (event: any) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
        if (
            (this.state.password !== '' &&
                this.state.confirmPassword !== '' &&
                (name === 'password' || 'confirmPassword') &&
                value === this.state.password) ||
            (value === this.state.confirmPassword && value !== '')
        ) {
            this.setState({
                validPasswords: 'true',
            });
        } else {
            this.setState({
                validPasswords: false,
            });
        }
    };

    render() {
        const {
            email,
            password,
            confirmPassword,
            validPasswords,
            validEmail,
        } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Register an Account
                </Typography>
                <Mutation mutation={CreateUserMutation}>
                    {(mutate: any) => (
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="confirmpassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={this.handleChange}
                            />
                            {validPasswords ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        await mutate({
                                            variables: this.state,
                                        });
                                        this.props.history.push('/login');
                                    }}
                                >
                                    Register
                                </Button>
                            ) : (
                                <Button disabled fullWidth variant="contained">
                                    Register
                                </Button>
                            )}

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {'Already have an account? Sign In'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Mutation>
            </Container>
        );
    }
}
