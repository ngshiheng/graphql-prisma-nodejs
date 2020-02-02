import React from 'react';
import { Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons';

export const HomePage = () => {
    return (
        <Typography align="center" color="primary" variant="h1">
            Home Page
            <div>
                <Home fontSize="large" color="primary" />
            </div>
        </Typography>
    );
};
