const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { prisma } = require('../generated/prisma-client');

const resolvers = require('../resolvers');
const schemaCode = fs.readFileSync(
    path.join(__dirname, '..', 'schemas', 'schema.graphql'),
    'utf8',
);

const TEST_EMAIL = 'e2e-test@email.com';
const TEST_PASSWORD = 'e2e-test-password-123';
const TEST_ROLE = 'USER';
let TEST_ID;

describe('server/src/resolvers/Users/UsersQuery.js', () => {
    let tester;
    beforeAll(() => {
        tester = new EasyGraphQLTester(schemaCode, resolvers);
    });
    test('createUser resolver should create a single user with role USER by default', async () => {
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
        const args = {
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        };

        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.data.createUser.user.id).to.exist;
        TEST_ID = result.data.createUser.user.id;
        expect(result.data.createUser.user.email).to.be.eq(TEST_EMAIL);
        expect(result.data.createUser.user.role).to.be.eq(TEST_ROLE);
    });
    test('should be able to login with newly created user', async () => {
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
        const args = {
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        };

        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.data.login.user.id).to.be.eq(TEST_ID);
        expect(result.data.login.user.email).to.be.eq(TEST_EMAIL);
        expect(result.data.login.user.role).to.be.eq(TEST_ROLE);
    });
    test('throw error when trying to create user with an existing email', async () => {
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
        const args = {
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        };
        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.errors).to.exist;
    });
    test('user resolver should be able to query newly created user', async () => {
        const query = `
             query user($id: ID!){
                user(id: $id) {
                    id
                    email
                    role
                }
            }
        `;
        const args = {
            id: TEST_ID,
        };
        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.data.user.id).to.be.eq(TEST_ID);
        expect(result.data.user.email).to.be.eq(TEST_EMAIL);
        expect(result.data.user.role).to.be.eq(TEST_ROLE);
    });
    test('updateUser resolver should be able to update user', async () => {
        const query = `
            mutation updateUser($id: ID!, $email: String) {
                updateUser(id: $id, input: { email: $email }) {
                    id
                    email
                }
            }
        `;
        const args = {
            id: TEST_ID,
            email: 'updated@email.com',
        };
        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.data.updateUser.id).to.be.eq(TEST_ID);
        expect(result.data.updateUser.email).to.be.eq('updated@email.com');
    });
    test('deleteUser resolver should be able to delete user', async () => {
        const query = `
            mutation deleteUser($id: ID!) {
                deleteUser(id: $id) {
                    id
                    email
                    role
                }
            }
        `;
        const args = {
            id: TEST_ID,
        };
        const result = await tester.graphql(query, {}, { prisma }, args);
        expect(result.data.deleteUser.id).to.be.eq(TEST_ID);
        expect(result.data.deleteUser.email).to.be.eq('updated@email.com');
        expect(result.data.deleteUser.role).to.be.eq(TEST_ROLE);
    });
});
