const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../../utils');

const login = async (parent, args, context) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('User does not exist');
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Incorrect password'); // Note: Change this error message to something more ambiguous
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET); // TODO: Add user role into payload?
    return {
        token,
        user,
    };
};

const createUser = async (parent, args, context) => {
    // TODO: Input validation
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

const updateUser = async (parent, args, context) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return context.prisma.updateUser({
        where: { id: args.id },
        data: { ...args.input },
    });
};

const deleteUser = async (parent, args, context) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return await context.prisma.deleteUser({ id: args.id });
};

module.exports = {
    login,
    createUser,
    updateUser,
    deleteUser,
};
