const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');

const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', '..', 'schemas', 'schema.graphql'),
    'utf8',
);

describe('server/src/resolvers/Users/UsersQuery.js', () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode);
    });
    afterAll(() => {
        tester.clearFixture();
    });
    test('user query should not throw any error', () => {
        const fixture = {
            data: {
                user: {
                    id: 'test-id',
                    email: 'test@test.com',
                    role: 'USER',
                },
            },
        };
        const query = `
            query user($id: ID!) {
                user(id: $id) {
                    id
                    email
                    role
                }
            }      
        `;
        const variables = {
            id: 'test-id',
        };
        const {
            data: { user },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(user.id).to.be.eq('test-id');
        expect(user.email).to.be.eq('test@test.com');
        expect(user.role).to.be.eq('USER');
    });
    test('users query should not throw any error', () => {
        const fixture = {
            data: {
                users: {
                    totalCount: 6,
                    pageInfo: {
                        hasNextPage: true,
                        hasPreviousPage: false,
                        startCursor: 'user1-id',
                        endCursor: 'author2-id',
                    },
                    edges: [
                        {
                            node: {
                                id: 'user1-id',
                                email: 'user2@test.com',
                                role: 'USER',
                            },
                        },
                        {
                            node: {
                                id: 'user3-id',
                                email: 'user3@test.com',
                                role: 'USER',
                            },
                        },
                        {
                            node: {
                                id: 'author3-id',
                                email: 'author3@admin.com',
                                role: 'ADMIN',
                            },
                        },
                        {
                            node: {
                                id: 'author2-id',
                                email: 'author2@admin.com',
                                role: 'ADMIN',
                            },
                        },
                    ],
                },
            },
        };
        const query = `
            query users(
                $filter: String
                $skip: Int
                $first: Int
                $orderBy: UserOrderByInput
            ) {
                users(filter: $filter, skip: $skip, first: $first, orderBy: $orderBy) {
                    totalCount
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges {
                        node {
                            id
                            email
                            role
                            createdAt
                            updatedAt
                        }
                    }
                }
            }
        `;
        const variables = {
            filter: 'u',
            skip: 1,
            first: 4,
            orderBy: 'createdAt_ASC',
        };
        const {
            data: { users },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(users.edges).to.be.an('array');
        expect(users.edges.length).to.be.eq(4);

        expect(users.totalCount).to.be.eq(6);
        expect(users.edges[0].node.id).to.be.eq('user1-id');
        expect(users.edges[0].node.email).to.be.eq('user2@test.com');
        expect(users.edges[0].node.role).to.be.eq('USER');

        expect(users.edges[1].node.id).to.be.eq('user3-id');
        expect(users.edges[1].node.email).to.be.eq('user3@test.com');
        expect(users.edges[1].node.role).to.be.eq('USER');

        expect(users.edges[2].node.id).to.be.eq('author3-id');
        expect(users.edges[2].node.email).to.be.eq('author3@admin.com');
        expect(users.edges[2].node.role).to.be.eq('ADMIN');

        expect(users.edges[3].node.id).to.be.eq('author2-id');
        expect(users.edges[3].node.email).to.be.eq('author2@admin.com');
        expect(users.edges[3].node.role).to.be.eq('ADMIN');
    });
    test('login mutation should not throw any error', () => {
        const fixture = {
            data: {
                createUser: {
                    token: 'some-legit-token',
                    user: {
                        id: 'test-id',
                        email: 'test@email.com',
                        role: 'USER',
                    },
                },
            },
        };
        const query = `
                mutation createUser($email: String! $password: String!) {
                    createUser(input: { email: $email, password: $password }) {
                        token
                        user {
                            id
                            email
                            role
                        }
                    }
                }
        `;
        const variables = {
            email: 'test@test.com',
            password: 'test-password-123',
        };
        const {
            data: { createUser },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(createUser.user.id).to.be.eq('test-id');
        expect(createUser.user.email).to.be.eq('test@email.com');
        expect(createUser.user.role).to.be.eq('USER');
        expect(createUser.token).to.exist;
        expect(createUser.token).to.be.eq('some-legit-token');
    });
    test('login mutation should not throw any error', () => {
        const fixture = {
            data: {
                login: {
                    token: 'some-legit-token',
                    user: {
                        id: 'test-id',
                        email: 'test@email.com',
                        role: 'USER',
                    },
                },
            },
        };
        const query = `
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                        id
                        email
                        role
                    }
                }
            }
        `;
        const variables = {
            email: 'test@test.com',
            password: 'test-password-123',
        };
        const {
            data: { login },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(login.user.id).to.be.eq('test-id');
        expect(login.user.email).to.be.eq('test@email.com');
        expect(login.user.role).to.be.eq('USER');
        expect(login.token).to.exist;
        expect(login.token).to.be.eq('some-legit-token');
    });
    test('updateUser mutation should not throw any error', () => {
        const fixture = {
            data: {
                updateUser: {
                    id: 'test-id',
                    email: 'updated@email.com',
                },
            },
        };
        const query = `
            mutation updateUser($id: ID!, $email: String) {
                updateUser(id: $id, input: { email: $email }) {
                    id
                    email
                }
            }
        `;
        const variables = {
            id: 'test-id',
            email: 'test@email.com',
        };
        const {
            data: { updateUser },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(updateUser.id).to.be.eq('test-id');
        expect(updateUser.email).to.be.eq('updated@email.com');
    });
    test('deleteUser mutation should not throw any error', () => {
        const fixture = {
            data: {
                deleteUser: {
                    id: 'test-id',
                    email: 'test@test.com',
                    role: 'USER',
                },
            },
        };
        const query = `
            mutation deleteUser($id: ID!) {
                deleteUser(id: $id) {
                    id
                    email
                    role
                }
            }
        `;
        const variables = {
            id: 'test-id',
        };
        const {
            data: { deleteUser },
        } = tester.mock({
            query,
            fixture,
            variables,
        });
        expect(deleteUser.id).to.be.eq('test-id');
        expect(deleteUser.email).to.be.eq('test@test.com');
        expect(deleteUser.role).to.be.eq('USER');
    });
});
