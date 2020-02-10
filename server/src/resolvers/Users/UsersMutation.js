const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (parent, args, { prisma }) => {
    const user = await prisma.user({ email: args.email });
    if (!user) {
        throw new Error('User does not exist'); // Note: Change this error message to something more ambiguous e.g. "Invalid credentials"
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Incorrect password'); // Note: Change this error message to something more ambiguous e.g. "Invalid credentials"
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRY,
    });
    return {
        token,
        user,
    };
};

exports.createUser = async (parent, args, { prisma, redis }) => {
    const email = await prisma.user({ email: args.input.email });
    if (email) {
        throw new Error('Email is already registered');
    }
    const hashedPassword = await bcrypt.hash(args.input.password, 10);
    const user = await prisma.createUser({
        ...args.input,
        password: hashedPassword,
    });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRY,
    });
    try {
        await redis.set(user.id, JSON.stringify(user));
    } catch (err) {
        throw new Error(`Redis | ${err}`);
    }
    return {
        token,
        user,
    };
};

exports.updateUser = async (parent, args, { prisma, redis }) => {
    const user = await prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }

    const update = await prisma.updateUser({
        where: { id: args.id },
        data: { ...args.input },
    });
    await redis.set(args.id, JSON.stringify(update));
    return update;
};

exports.deleteUser = async (parent, args, { prisma, redis }) => {
    const data = JSON.parse(await redis.get(args.id));
    if (data) {
        await redis.del(args.id);
    }
    const user = await prisma.user({ id: args.id });
    if (!user) {
        throw new Error('User does not exist');
    }
    return await prisma.deleteUser({ id: args.id });
};
