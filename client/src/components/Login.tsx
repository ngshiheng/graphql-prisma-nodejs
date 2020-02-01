import * as React from 'react';
import { Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { MyField } from './MyField';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

interface Values {
    email: string;
    password: string;
}

interface Props {
    onSubmit: (values: Values) => void;
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const Login: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                onSubmit(values);
            }}
        >
            {({ values, handleChange, handleBlur }) => (
                <Form>
                    <div>
                        <Field
                            name="email"
                            placeholder="example@mail.com"
                            component={MyField}
                            label={'Email'}
                        />
                    </div>
                    <div>
                        <Field
                            name="password"
                            component={MyField}
                            label={'Password'}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    );
};
