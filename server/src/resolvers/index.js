const UsersQuery = require('./Users/UsersQuery');
const UsersMutation = require('./Users/UsersMutation');

module.exports = {
    Query: {
        ...UsersQuery,
    },
    Mutation: {
        ...UsersMutation,
    },
};
