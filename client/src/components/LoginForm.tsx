import * as React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { CustomTextField } from './CustomTextField';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

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
                        console.log(data);
                        try {
                            const login = await mutation({
                                variables: data,
                            });
                            console.log(`Token | ${login.data.login.token}`);
                        } catch (error) {
                            console.error(`Error | ${error}`);
                        }
                    }}
                    validationSchema={loginFormValidationSchema}
                >
                    {({ isValid }) => (
                        <Container component="main" maxWidth="xs">
                            <Typography component="h1" variant="h5">
                                🔐 Sign In
                            </Typography>
                            <Form>
                                <CustomTextField
                                    placeholder="Email address"
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
                                    Sign In
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
