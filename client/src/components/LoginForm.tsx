import * as React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { LockOpen } from '@material-ui/icons';
import { Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { CustomTextField } from './CustomTextField';
import { useHistory } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import auth from '../utils/authentication';

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const loginFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .label('Email address')
        .email()
        .required()
        .max(255),
    password: yup
        .string()
        .label('Password')
        .required()
        .max(255),
});

export const LoginForm: React.FC = () => {
    const history = useHistory();
    return (
        <Mutation mutation={LOGIN_MUTATION}>
            {(mutation: any) => (
                <Formik
                    validateOnMount
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={async (data, { resetForm }) => {
                        resetForm();
                        try {
                            const login = await mutation({
                                variables: data,
                            });
                            localStorage.setItem(
                                'authentication-token',
                                login.data.login.token,
                            );
                            auth.login(() => history.push('/'));
                        } catch (error) {
                            alert(error);
                        }
                    }}
                    validationSchema={loginFormValidationSchema}
                >
                    {({ isValid }) => (
                        <Container component="main" maxWidth="xs">
                            <Typography
                                variant="h2"
                                color="primary"
                                align="center"
                            >
                                Login
                                <div>
                                    <LockOpen
                                        fontSize="large"
                                        color="primary"
                                    />
                                </div>
                            </Typography>
                            <Form>
                                <CustomTextField
                                    placeholder="Email Address"
                                    name="email"
                                />
                                <CustomTextField
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid}
                                    type="submit"
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
                                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            </Form>
                        </Container>
                    )}
                </Formik>
            )}
        </Mutation>
    );
};
