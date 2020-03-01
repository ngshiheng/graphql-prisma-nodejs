exports.post = async (parent, { id }, { prisma }) => {
    return await prisma.post({ id });
};

exports.posts = async (parent, args, { prisma }) => {
    const where = args.filter ? { OR: [{ title_contains: args.filter }] } : {};
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
};
