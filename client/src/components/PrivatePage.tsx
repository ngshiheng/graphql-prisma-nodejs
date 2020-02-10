import React from 'react';
import { Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';

export const PrivatePage = () => {
    return (
        <Typography align="center" color="secondary" variant="h1">
            Private Page
            <div>
                <Lock fontSize="large" color="secondary" />
            </div>
        </Typography>
    );
};
