import { expect } from 'chai';
import app from '../../src/index';
import { agent as request } from 'supertest';
import { UserModel } from '../../src/models/User';
import clc from 'cli-color';
import chai = require('chai');
import chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Testing UserModel', () => {
    // Before tests start make sure db is cleared and in dev mode
    before(function (done) {
        if ((process.env.NODE_ENV as string) !== 'development') {
            console.log(clc.red('Attempting to run tests in the wrong dev. environment!'));
            this.skip();
        }
        // Clear test database table
        UserModel.destroy({ truncate: true });
        // Begin tests
        done();
    });

    describe('Testing happy cases', () => {
        // Hold on to auth token for subsequent requests after login
        let token: string;

        // Allow for login session to continue
        const agent = chai.request.agent(app);

        // Close agent after these tests are done
        after((done) => {
            agent.close();
            done();
        });

        // Register a new user
        it('should POST/auth/register', async function () {
            const user = { email: 'goat@gmail.com', password: 'messiPassword', firstName: 'Lionel', lastName: 'Messi' };
            const res = await request(app).post('/auth/register').send(user);
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
        });

        // Test log in
        it('should POST/auth/login', async function () {
            const user = { email: 'goat@gmail.com', password: 'messiPassword' };
            const res = await agent.post('/auth/login').send(user);
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.have.property('info').to.have.property('info').to.equal('Successfully logged in.');
            expect(res.body).to.have.property('info').to.have.property('token');
            token = res.body.info.token;
        });

        // Get user info back
        it('should GET/auth/user', async function () {
            const res = await agent.get('/auth/user').set('Authorization', token);
            // should get status 200, which indicates req.session existence.
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('info').to.have.property('id');
            expect(res.body).to.have.property('info').to.have.property('firstName');
            expect(res.body).to.have.property('info').to.have.property('lastName');
            expect(res.body).to.have.property('info').to.have.property('email');
        });

        // Update user info, change email
        it('should PUT/auth/user update email', async function () {
            const res = await agent.put('/auth/user').set('Authorization', token).send({ email: 'newEmail@gmail.com' });
            // should get status 200, which indicates req.session existence.
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('info').to.equal('Successfully updated user.');
        });

        // Update user info, change name
        it('should PUT/auth/user update firstname', async function () {
            const res = await agent.put('/auth/user').set('Authorization', token).send({ firstName: 'NewName' });
            // Should get status 200, which indicates req.session existence.
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('info').to.equal('Successfully updated user.');
        });

        // Logout registered user
        it('should  POST/auth/logout', async function () {
            const res = await agent.post('/auth/logout').set('Authorization', token);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('info').to.equal('Successfully logged out.');
        });

        describe('Test delete', () => {
            // Have a valid registered, logged in user to do other tests with
            before(async () => {
                const user = {
                    email: 'smth@gmail.com',
                    password: 'smthPassword',
                    firstName: 'Lionel',
                    lastName: 'Messi',
                };
                await request(app).post('/auth/register').send(user);
                const resLog = await agent
                    .post('/auth/login')
                    .send({ email: 'smth@gmail.com', password: 'smthPassword' });
                token = resLog.body.info.token;
            });

            // Get delete user
            it('should DELETE/auth/user', async function () {
                const res = await agent.delete('/auth/user').set('Authorization', token);
                // Should get status 200, which indicates req.session existence.
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('info').to.equal('Successfully deleted user.');
            });
        });
    });
});
