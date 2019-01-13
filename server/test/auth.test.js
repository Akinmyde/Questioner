/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

// test for post sign-up
// describe('Auth Token', () => {
//   it('should return a token', () => {
//     expect(authToken).toBeTruthy();
//   });
// });
describe('POST /auth/sign-up', () => {
  // Test for user registration
  it('should respond with status code 201', async () => {
    const user = {
      email: 'test@gmail.com',
      username: 'test',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/sign-up')
      .send(await user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ status: 201, data: [user] });
      })
      .end(err => err);
  });
  // Test for already exist user email
  it('should respond with 409 and message email already exists', async () => {
    const user = {
      email: 'test@gmail.com',
      username: 'test',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/sign-up')
      .send(await user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .expect((res) => {
        expect(res.body).toEqual({ status: 409, error: 'Email already exists' });
      })
      .end(err => err);
  });

  // Test for already exist username
  it('should respond with 409 and message username already exists', async () => {
    const user = {
      email: 'test1@gmail.com',
      username: 'test',
      password: 'test',
      isAdmin: false,
    };
    request(app)
      .post('/api/v1/auth/sign-up')
      .send(await user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .expect((res) => {
        expect(res.body).toEqual({ status: 409, error: 'Username already exists' });
      })
      .end(err => err);
  });
});

// Post user sign-in
describe('POST /auth/sign-in', () => {
  it('should respond with status code 200', (done) => {
    request(app)
      .post('/api/v1/auth/sign-in')
      .send({
        email: 'JohnDoe@gmail.com',
        password: 'test',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ status: 200, message: 'Login was successfull' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should respond with 401 and message login failed', (done) => {
    request(app)
      .post('/api/v1/auth/sign-in')
      .send({
        email: 'JohnDoe@gmail.com',
        password: 'rubbish',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({ status: 401, error: 'Login failed' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
