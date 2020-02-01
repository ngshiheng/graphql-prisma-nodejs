import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                                autoComplete="email"
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
                                autoComplete="current-password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <Button
                                type="submit"
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
