const { getUserId } = require('../../utils/utils');

exports.createPost = async (parent, args, context) => {
    const userId = getUserId(context);
    return await context.prisma.createPost({
        author: { connect: { id: userId } },
        ...args.input,
    });
};

exports.updatePost = async (parent, args, { prisma }) => {
    const post = await prisma.post({ id: args.id });
    if (!post) {
        return Error('Post does not exist');
    }
    return await prisma.updatePost({
        where: { id: args.id },
        data: { ...args.input },
    });
};

exports.deletePost = async (parent, args, { prisma }) => {
    const post = await prisma.post({ id: args.id });
    if (!post) {
        return Error('Post does not exist');
    }
    return await prisma.deletePost({ id: args.id });
};
