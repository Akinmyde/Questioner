/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

const user = {
  email: 'test@gmail.com',
  username: 'test',
  password: 'test',
};

describe('POST /auth/signup', () => {
  it('should respond with status 201', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(201);
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('Registration was successfull');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 409 and message email already exists', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .expect(409);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toEqual({ status: 409, error: 'Username already exists' });
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 409 and message email already exists', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test1@gmail.com', username: 'test', password: 'test' })
        .expect(409);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toEqual({ status: 409, error: 'Email already exists' });
    } catch (error) {
      console.log(error);
    }
  });
});
describe('POST /auth/login', () => {
  // Test for user login
  it('should respond with 200', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'test@gmail.com', password: 'test' })
        .expect(200);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data[0].message).toEqual('Login was successful');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 404 and error There is no user with this credentials', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'feesrfh@yahoo.com', password: 'yrvbiykjbnuikjh' })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
  it('should respond with 401 and error Invalid username or password', async () => {
    try {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'test@gmail.com', password: 'yrvbiykjbnuikjh' })
        .expect(401);
      expect(res.statusCode).toEqual(401);
      expect(res.body.error).toEqual('Invalid username or password');
    } catch (error) {
      console.log(error);
    }
  });
});
