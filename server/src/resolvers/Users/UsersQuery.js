exports.user = async (parent, args, context) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return user;
};

exports.users = async (parent, args, context) => {
    const where = args.filter ? { OR: [{ email_contains: args.filter }] } : {};
    const users = await context.prisma.usersConnection({
        where,
        skip: args.skip,
        after: args.after,
        before: args.before,
        first: args.first,
        last: args.last,
        orderBy: args.orderBy,
    });
    const totalCount = await context.prisma
        .usersConnection({
            where,
        })
        .aggregate()
        .count();
    return {
        edges: users.edges,
        pageInfo: users.pageInfo,
        totalCount,
    };
};
