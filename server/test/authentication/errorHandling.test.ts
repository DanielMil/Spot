import { expect } from 'chai';
import app from '../../src/index';
import { agent as request } from 'supertest';
import { UserModel } from '../../src/models/User';
import chai from 'chai';
import chaiHttp from 'chai-http';
import clc from 'cli-color';

chai.should();
chai.use(chaiHttp);

describe('Testing UserModel', () => {
    // Before tests start make sure db is cleared and in dev mode
    before(function (done) {
        // Wait for the server to emit the ready signal before starting the tests
        app.on('db_ready', () => {
            if ((process.env.NODE_ENV as string) !== 'development') {
                console.log(clc.red('Attempting to run tests in the wrong dev. environment!'));
                this.skip();
            }
            // Clear test database table
            UserModel.destroy({ truncate: true });
            // Begin tests
            done();
        });
    });

    describe('Testing Error Cases Register and Login', () => {
        // Hold on to auth token for subsequent requests after login
        let token: string;

        // Allow for login session to continue
        const agent = chai.request.agent(app);

        // Have a valid registered user to do other tests with
        before(async () => {
            const user = { email: 'goat@gmail.com', password: 'messiPassword', firstName: 'Lionel', lastName: 'Messi' };
            await request(app).post('/auth/register').send(user);
        });

        // Close agent after these tests are done
        after((done) => {
            agent.close();
            done();
        });

        // Register a new user msssing an email field
        it('should not POST/auth/register, missing field', async function () {
            const user = { password: 'messiPassword', firstName: 'Lionel', lastName: 'Messi' };
            const res = await request(app).post('/auth/register').send(user);
            expect(res.status).to.equal(302);
            expect(res.header.location).to.equal('/redirect/missingFieldError');
        });

        // Register a new user with invalid email
        it('should not POST/auth/register, invalid email', async function () {
            const user = { email: 'goatgmail.com', password: 'messiPassword', firstName: 'Lionel', lastName: 'Messi' };
            const res = await request(app).post('/auth/register').send(user);
            expect(res.status).to.equal(302);
            expect(res.header.location).to.equal('/redirect/invalidEmailPattern');
        });

        // Test invalid log in
        it('should not POST/auth/login wrong email', async function () {
            const user = { email: 'some@gmail.com', password: 'messiPassword' };
            const res = await agent.post('/auth/login').send(user);
            expect(res.status).to.equal(400);
            expect(res.body)
                .to.have.property('info')
                .to.equal('Invalid credentials. There was an issue logging in to your account.');
        });

        // Test invalid log in
        it('should not POST/auth/loginm wrong password', async function () {
            const user = { email: 'goat@gmail.com', password: 'nothing' };
            const res = await agent.post('/auth/login').send(user);
            expect(res.status).to.equal(400);
            expect(res.body)
                .to.have.property('info')
                .to.equal('Invalid credentials. There was an issue logging in to your account.');
        });

        // Update user info, without login
        it('should PUT/auth/user update without login invalid email', async function () {
            const res = await agent.put('/auth/user').set('Authorization', 'nothing').send({ email: 'smth@gmail.com' });
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('info').to.equal('There is no user in session.');
        });

        describe('Testing Sad Cases After Login', () => {
            // Have a valid registered, Logged in user to do other tests with
            before(async () => {
                const resLog = await agent
                    .post('/auth/login')
                    .send({ email: 'goat@gmail.com', password: 'messiPassword' });
                token = resLog.body.info.token;
            });

            // Get user info back
            it('should not GET/auth/user, unauthorized', async function () {
                const res = await agent.get('/auth/user').set('Authorization', 'empty');
                expect(res.status).to.equal(401);
            });

            // Update user info, with empty request
            it('should PUT/auth/user update with no fields', async function () {
                const res = await agent.put('/auth/user').set('Authorization', token).send({});
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('info').to.equal('Missing required field.');
            });

            // Update user info, with invalid email
            it('should PUT/auth/user update with invalid email', async function () {
                const res = await agent.put('/auth/user').set('Authorization', token).send({ email: 'smth.com' });
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('info').to.equal('Invalid email pattern.');
            });

            // Register a new user msssing an email field
            it('should not POST/auth/logout', async function () {
                const res = await request(app).post('/auth/logout').set('Authorization', 'nothing');
                expect(res.status).to.equal(302);
            });

            // Delete unauth user
            it('should not DELETE/auth/user, unauth', async function () {
                const res = await agent.delete('/auth/user').set('Authorization', 'nothing');
                expect(res.status).to.equal(401);
            });
        });
    });
});
