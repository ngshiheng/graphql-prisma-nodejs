const jwt = require('jsonwebtoken');

exports.getUserId = context => {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, process.env.SECRET);
        return userId;
    }
    throw new Error('Unauthorized request');
};
