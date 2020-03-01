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
        posts: async ({ id }, args, { prisma }) => {
            const where = args.filter
                ? { AND: [{ author: { id }, title_contains: filter }] }
                : { author: { id } };
            const posts = await prisma.postsConnection({
                where,
                skip: args.skip,
                after: args.after,
                before: args.before,
                first: args.first,
                last: args.last,
                orderBy: args.orderBy,
            });

            const totalCount = await prisma
                .postsConnection({ where })
                .aggregate()
                .count();

            return {
                edges: posts.edges,
                pageInfo: posts.pageInfo,
                totalCount,
            };
        },
    },
    Post: {
        author: ({ id }, args, { prisma }) => prisma.post({ id }).author(),
    },
};
