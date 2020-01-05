const { rule, shield, or } = require('graphql-shield');
const { getUserId } = require('../utils');

const isAdmin = rule()(async (parent, args, context) => {
    const userId = getUserId(context);
    const user = await context.prisma.user({
        id: userId,
    });
    return user.role === 'ADMIN';
});

const isOwner = rule()(async (parent, args, context) => {
    const userId = getUserId(context);
    return userId === args.id;
});

const isAuthenticated = rule()(async (parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
});

const permissions = shield({
    Query: {
        user: isAuthenticated,
        users: isAuthenticated,
    },
    Mutation: {
        updateUser: or(isAdmin, isOwner),
        deleteUser: or(isAdmin),
    },
});

module.exports = {
    permissions,
};
