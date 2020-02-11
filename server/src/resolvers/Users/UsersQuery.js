exports.user = async (parent, args, { prisma, redis }) => {
    const data = JSON.parse(await redis.get(args.id));
    if (data) {
        return data;
    } else {
        console.log(
            'User not found in Redis, fetching user from database instead',
        );
    }
    const user = await prisma.user({ id: args.id });
    if (!user) {
        return new Error('User does not exist');
    }
    return user;
};

exports.users = async (parent, args, { prisma }) => {
    const where = args.filter ? { OR: [{ email_contains: args.filter }] } : {};
    const users = await prisma.usersConnection({
        where,
        skip: args.skip,
        after: args.after,
        before: args.before,
        first: args.first,
        last: args.last,
        orderBy: args.orderBy,
    });
    const totalCount = await prisma
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
