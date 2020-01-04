const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const { permissions } = require('./permissions');
const Query = require('./resolvers/Users/Query');
const Mutation = require('./resolvers/Users/Mutation');
const resolvers = {
    Query,
    Mutation,
};

const defaultLoginQuery = `# Enter your <email> and <password> to login to receive your access token
mutation {
  login(email: "<email>", password: "<password>") {
    token
    user {
      id
      role
    }
  }
}

# Replace <paste access token here> with your access token
# Paste the authorization header below in the 'HTTP HEADERS' tab at the bottom of the page for all your requests
#   {
#        Authorization: 'Bearer <paste access token here>',
#   }
`;

const server = new GraphQLServer({
    typeDefs: './src/schemas/Users/schema.graphql', // TODO: Bind all typeDefs & resolvers from different objects
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
