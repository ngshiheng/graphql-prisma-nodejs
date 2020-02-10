const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { redis } = require('./utils/redis');
const { permissions } = require('./middlewares/permissions');
const resolvers = require('./resolvers');

const defaultLoginQuery = `# Enter your email and password to login to receive your access token
mutation {
    login(email: "", password: "") {
        token
        user {
            id
            role
        }
    }
}

# Replace <paste access token here> with your access token
# Paste the authorization header below in the 'HTTP HEADERS' tab at the bottom of the page for all your requests
# { "Authorization": "Bearer <paste access token here>" }
`;

const server = new GraphQLServer({
    typeDefs: './src/schemas/schema.graphql',
    resolvers,
    middlewares: [permissions],
    context: request => {
        return {
            ...request,
            prisma,
            redis,
        };
    },
});

const options = {
    port: process.env.PORT,
    endpoint: process.env.ENDPOINT,
    playground: process.env.ENDPOINT,
    defaultPlaygroundQuery: defaultLoginQuery,
};

server.start(options, () =>
    console.log(
        `🚀  Server is running on http://localhost:${process.env.PORT}${process.env.ENDPOINT}`,
    ),
);
