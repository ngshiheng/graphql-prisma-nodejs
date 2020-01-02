const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Users/Query');
const Mutation = require('./resolvers/Users/Mutation');
const resolvers = {
    Query,
    Mutation,
};

const server = new GraphQLServer({
    typeDefs: './src/schema/Users/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        };
    },
});

server.start(() =>
    console.log(`🚀  Server is running on http://localhost:4000`),
);
