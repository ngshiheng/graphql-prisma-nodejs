const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../../utils');

const login = async (parent, args, context, info) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (isPasswordValid) {
        throw new Error('Incorrect password'); // Note: You might want to change this error message to something more ambiguous
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user,
    };
};

const createUser = async (parent, args, context, info) => {
    const hashedPassword = await bcrypt.hash(args.input.password, 10);
    const user = await context.prisma.createUser({
        ...args.input,
        password: hashedPassword,
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user,
    };
};

// TODO: Add authentication check, only admin/user can delete their own account
const updateUser = async (parent, args, context, info) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return await context.prisma.updateUser({
        where: { id: args.id },
        data: { ...args.input },
    });
};

// TODO: Add authentication check, only admin/user can delete their own account
const deleteUser = async (parent, args, context, info) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    const deletedUser = await context.prisma.deleteUser({ id: args.id });
    return { info: `Successfully deleted user: ${deletedUser.email}` };
};

module.exports = {
    login,
    createUser,
    updateUser,
    deleteUser,
};
