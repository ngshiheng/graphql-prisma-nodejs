import React from 'react';
import { Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';

export const PageNotFound: React.FC = () => {
    return (
        <Typography align="center" color="error" variant="h2">
            Error 404 Page Not Found
            <div>
                <ErrorOutline fontSize="large" color="secondary" />
            </div>
        </Typography>
    );
};
