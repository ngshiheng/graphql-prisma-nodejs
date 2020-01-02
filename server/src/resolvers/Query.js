const user = async (parent, args, context, info) =>
    await context.prisma.user({ id: args.id }); // TODO: Mask return password

const users = async (parent, args, context, info) =>
    await context.prisma.users(); // TODO: Mask return password

module.exports = {
    user,
    users,
};
