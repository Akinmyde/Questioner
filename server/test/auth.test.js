/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

describe('POST /auth/signup', () => {
  it('should respond with status 200', (done) => {
    const user = {
      email: 'test@gmail.com',
      username: 'test',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(201);
    done();
  });
  it('should respond with 409 and message email already exists', (done) => {
    const user = {
      email: 'test@gmail.com',
      username: 'test',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body).toEqual({ status: 409, error: 'Email already exists' });
        done();
      });
    done();
  });
  it('should respond with 409 and message username already exists', (done) => {
    const user = {
      email: 'test1@gmail.com',
      username: 'test',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .expect(409)
      .end((err, res) => {
        expect(res.body).toEqual({ status: 409, error: 'Username already exists' });
        done();
      });
    done();
  });
});

describe('POST /auth/login', () => {
  // Test for user login
  it('should respond with 200', (done) => {
    const user = {
      username: 'test@gmail.com',
      password: 'test',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200);
    done();
  });

  it('should respond with 404 and error There is no user with this credentials', (done) => {
    const user = {
      username: 'test123',
      password: 'test12323',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(404)
      .end((err, res) => {
        expect(res.body).toEqual({ status: 404, error: 'There is no user with this credentials' });
        done();
      });
    done();
  });

  it('should respond with 401 and error Invalid username or password', (done) => {
    const user = {
      username: 'test@gmail.com',
      password: 'test1',
    };
    request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .expect(401)
      .end((err, res) => {
        expect(res.body).toEqual({ status: 401, error: 'Invalid username or password' });
        done();
      });
    done();
  });
});
