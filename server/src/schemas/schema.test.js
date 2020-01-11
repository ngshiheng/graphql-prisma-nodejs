const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const schemaCode = fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8',
);

describe('server/src/schemas/schema.graphql', () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode);
    });
    describe('User queries', () => {
        test('user', () => {
            const query = `
                query user($id: ID!) {
                    user(id: $id) {
                        id
                        email
                        role
                        createdAt
                        updatedAt
                    }
                }
            `;
            tester.test(true, query, {
                id: 'test-id',
            });
        });
        test('users', () => {
            const query = `
                query users(
                    $filter: String
                    $skip: Int
                    $after: String
                    $before: String
                    $first: Int
                    $last: Int
                    $orderBy: UserOrderByInput
                ) {
                    users(
                        filter: $filter
                        skip: $skip
                        after: $after
                        before: $before
                        first: $first
                        last: $last
                        orderBy: $orderBy
                    ) {
                        totalCount
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
            tester.test(true, query);
        });
    });
    describe('User mutations', () => {
        test('createUser', () => {
            const mutation = `
                mutation CreateUser($email: String! $password: String!) {
                    createUser(input: { email: $email, password: $password }) {
                        token
                        user {
                            id
                            email
                            role
                            createdAt
                            updatedAt
                        }
                    }
                }
            `;
            tester.test(true, mutation, {
                email: 'test@test.com',
                password: 'test-password-123',
            });
        });
        test('login', () => {
            const mutation = `
                mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                        user {
                            id
                            email
                            role
                            createdAt
                            updatedAt
                        }
                    }
                }
            `;
            tester.test(true, mutation, {
                email: 'test@test.com',
                password: 'test-password-123',
            });
        });
        test('updateUser', () => {
            const mutation = `
                mutation updateUser($id: ID!, $email: String, $role: Role) {
                    updateUser(id: $id, input: { email: $email, role: $role }) {
                        id
                        email
                        role
                        createdAt
                        updatedAt
                    }
                }
            `;
            tester.test(true, mutation, {
                id: 'test-id',
                email: 'update-test@test.com',
                role: 'USER',
            });
        });
        test('deleteUser', () => {
            const mutation = `
                mutation deleteUser($id: ID!) {
                    deleteUser(id: $id) {
                        id
                        email
                        role
                        createdAt
                        updatedAt
                    }
                }
            `;
            tester.test(true, mutation, {
                id: 'test-id',
            });
        });
    });
});
