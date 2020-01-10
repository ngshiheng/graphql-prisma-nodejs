const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe('/Users/UsersMutation.js', () => {
    it('any should be able to createUser', done => {
        const createUser = `
        mutation {
            createUser(input: { email: "tester", password: "tester" }) {
                token
                user {
                    email
                }
            }
        }
        `;
        request
            .post('/graphql')
            .send({
                query: createUser,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.data.createUser.token).to.have.lengthOf(177);
                expect(res.body.data.createUser.user.email).to.equal('tester');
                done();
            });
    });
    it('registered user should be able to login', done => {
        const login = `
        mutation {
            login(email: "tester", password: "tester") {
                token
                user {
                    id
                }
            }
        }                  
        `;
        request
            .post('/graphql')
            .send({
                query: login,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const userId = res.body.data.login.user.id;
                expect(res.body.data.login.token).to.have.lengthOf(177);
                done();
            });
    });
});
