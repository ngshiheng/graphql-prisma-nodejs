const user = async (parent, args, context, info) =>
    await context.prisma.user({ id: args.id }); // TODO: Mask return password

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
    }); // TODO: Mask return password
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
