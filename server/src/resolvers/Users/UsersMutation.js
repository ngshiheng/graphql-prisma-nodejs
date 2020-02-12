const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../../utils/mailer');

exports.login = async (parent, args, { prisma }) => {
    const user = await prisma.user({ email: args.email });
    if (!user) {
        return Error('User does not exist'); // Note: Change this error message to something more ambiguous e.g. "Invalid credentials"
    }
    const isPasswordValid = await bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) {
        return Error('Incorrect password'); // Note: Change this error message to something more ambiguous e.g. "Invalid credentials"
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
        return Error('Email is already registered');
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
        return Error(`Redis | ${err}`);
    }
    return {
        token,
        user,
    };
};

exports.updateUser = async (parent, args, { prisma, redis }) => {
    const user = await prisma.user({ id: args.id });
    if (!user) {
        return Error('User does not exist');
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
        return Error('User does not exist');
    }
    return await prisma.deleteUser({ id: args.id });
};

exports.resetPassword = async (parent, args, { prisma }) => {
    const user = await prisma.user({ email: args.email });
    if (user) {
        const passwordResetToken = jwt.sign(
            { userEmail: user.email },
            process.env.SECRET, // Note: Sign this with a different secret
            {
                expiresIn: process.env.EXPIRY, // Note: Should set shorter expiry
            },
        );
        sendPasswordResetEmail(user.email, passwordResetToken);
    }
    return { message: 'Email sent successfully' };
};

exports.updatePassword = async (parent, args, { prisma, request }) => {
    let email;
    const authorization = request.get('Authorization');
    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        email = jwt.verify(token, process.env.SECRET).userEmail;
    }
    const hashedPassword = await bcrypt.hash(args.password, 10);
    await prisma.updateUser({
        where: { email },
        data: { password: hashedPassword },
    });
    return { message: 'Password reset succsessful' };
};
