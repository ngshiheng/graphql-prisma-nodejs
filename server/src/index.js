const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { permissions } = require('./permissions');
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
        };
    },
});

const options = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/graphql',
    defaultPlaygroundQuery: defaultLoginQuery,
};

server.start(options, () =>
    console.log(
        `🚀  Server is running on http://localhost:${options.port}/graphql`,
    ),
);
