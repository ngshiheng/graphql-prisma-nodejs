const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (parent, args, context) => {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('User does not exist'); // Note: Change this error message to something more ambiguous e.g. "Incorrect email or password"
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Incorrect password'); // Note: Change this error message to something more ambiguous e.g. "Incorrect email or password"
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRY,
    });
    return {
        token,
        user,
    };
};

exports.createUser = async (parent, args, context) => {
    const email = await context.prisma.user({ email: args.input.email });
    if (email) {
        throw new Error('Email is already registered');
    }
    const hashedPassword = await bcrypt.hash(args.input.password, 10);
    const user = await context.prisma.createUser({
        ...args.input,
        password: hashedPassword,
    });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRY,
    });
    return {
        token,
        user,
    };
};

exports.updateUser = async (parent, args, context) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return context.prisma.updateUser({
        where: { id: args.id },
        data: { ...args.input },
    });
};

exports.deleteUser = async (parent, args, context) => {
    const user = await context.prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return await context.prisma.deleteUser({ id: args.id });
};
