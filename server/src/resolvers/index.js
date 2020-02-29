const UsersQuery = require('./Users/UsersQuery');
const UsersMutation = require('./Users/UsersMutation');
const PostsQuery = require('./Posts/PostsQuery');
const PostsMutation = require('./Posts/PostsMutation');

module.exports = {
    Query: {
        ...UsersQuery,
        ...PostsQuery,
    },
    Mutation: {
        ...UsersMutation,
        ...PostsMutation,
    },
    User: {
        posts: ({ id }, args, { prisma }) => prisma.user({ id }).posts(),
    },
    Post: {
        author: ({ id }, args, { prisma }) => prisma.post({ id }).author(),
    },
};
