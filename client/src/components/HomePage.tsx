import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import auth from '../utils/authentication';

export const HomePage: React.FC = () => {
    const history = useHistory();
    return (
        <Container component="main" maxWidth="xs">
            <Typography align="center" color="primary" variant="h2">
                Home
                <div>
                    <Home fontSize="large" color="primary" />
                </div>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => {
                        auth.logout(() => {
                            history.push('/login');
                        });
                        localStorage.removeItem('authentication-token');
                    }}
                >
                    Logout
                </Button>
            </Typography>
        </Container>
    );
};
