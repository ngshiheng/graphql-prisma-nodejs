import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';

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
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Mutation mutation={LoginMutation}>
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
                                label="Re-enter Password"
                                type="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
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
                                    this.props.history.push(
                                        'localhost:4000/graphql',
                                    );
                                }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
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
