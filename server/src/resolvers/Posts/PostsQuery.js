exports.post = async (parent, { id }, { prisma }) => {
    return await prisma.post({ id });
};
