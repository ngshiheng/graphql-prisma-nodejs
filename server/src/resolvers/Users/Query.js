const user = async (parent, args, context, info) => {
    const user = await context.prisma.user({ id: args.id }); // TODO: Mask return password
    if (!user) {
        throw new Error('User does not exist');
    }
    return user;
};

const users = async (parent, args, context, info) => {
    const where = args.filter
        ? {
              OR: [{ role_contains: args.filter }],
          }
        : {};
    const users = await context.prisma.users({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    });
    const totalCount = await context.prisma
        .usersConnection({
            where,
        })
        .aggregate()
        .count();
    return {
        users,
        totalCount,
    };
};

module.exports = {
    user,
    users,
};
