import React from 'react';
import {
    Avatar,
    CircularProgress,
    Container,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Lock, AccountCircle } from '@material-ui/icons';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

const GET_USERS_QUERY = gql`
    {
        users {
            totalCount
            edges {
                node {
                    id
                    email
                    role
                }
            }
        }
    }
`;

export const PrivatePage: React.FC = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <Typography align="center" color="primary" variant="h2">
                Private Page
                <div>
                    <Lock fontSize="large" color="primary" />
                </div>
            </Typography>
            <Grid container spacing={2}>
                <Grid>
                    <Typography variant="h6" className={classes.title}>
                        User List
                    </Typography>
                    <div className={classes.demo}>
                        <Query query={GET_USERS_QUERY}>
                            {({ loading, error, data }: any) => {
                                if (loading)
                                    return <CircularProgress color="primary" />;
                                if (error)
                                    return (
                                        <Typography color="error">
                                            {error.message}
                                        </Typography>
                                    );
                                const userListToRender = data.users.edges;
                                return (
                                    <List>
                                        {userListToRender.map((user: any) => (
                                            <ListItem key={user.node.id}>
                                                <ListItemAvatar
                                                    key={user.node.id}
                                                >
                                                    <Avatar>
                                                        <AccountCircle />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={user.node.email}
                                                    secondary={user.node.role}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                );
                            }}
                        </Query>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
