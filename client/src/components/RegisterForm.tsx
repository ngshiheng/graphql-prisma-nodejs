import * as React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { CustomTextField } from './CustomTextField';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation($email: String!, $password: String!) {
        createUser(input: { email: $email, password: $password }) {
            token
        }
    }
`;

const registerFormValidationSchema = yup.object().shape({
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
        .min(4, 'Password is too short')
        .max(20, 'Password is too long'),
    confirmPassword: yup
        .string()
        .label('Confirm password')
        .required()
        .test('passwords-match', 'Passwords must match', function(value) {
            return this.parent.password === value;
        }),
});

export const RegisterForm: React.FC = () => {
    return (
        <Mutation mutation={CREATE_USER_MUTATION}>
            {(mutation: any) => (
                <Formik
                    validateOnMount
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={async (data, { resetForm }) => {
                        resetForm();
                        try {
                            const register = await mutation({
                                variables: data,
                            });
                            console.log(
                                `Token | ${register.data.createUser.token}`,
                            );
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                    validationSchema={registerFormValidationSchema}
                >
                    {({ isValid }) => (
                        <Container component="main" maxWidth="xs">
                            <Typography component="h1" variant="h5">
                                Register an Account
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
                                <CustomTextField
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={!isValid}
                                    type="submit"
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
                                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                            </Form>
                        </Container>
                    )}
                </Formik>
            )}
        </Mutation>
    );
};
