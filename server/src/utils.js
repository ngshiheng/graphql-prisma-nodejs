const jwt = require('jsonwebtoken');
const APP_SECRET = 'your-app-secret'; // Note: Keep your secret key in environment variable

const getUserId = context => {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        return userId;
    }
    throw new Error('Unauthorized request');
};

module.exports = {
    APP_SECRET,
    getUserId,
};
