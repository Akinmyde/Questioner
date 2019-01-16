/* eslint-env mocha */
import request from 'supertest';
import expect from 'expect';
import app from '../app';

request.agent(app.listen());

const superUser = {
  email: 'superuser@yahoo.com',
  username: 'superuser',
  password: 'superuserpass',
  isAdmin: true,
};

let superUserToken;

before(async () => {
  try {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(superUser);
    superUserToken = res.body.data[0].token;
  } catch (error) {
    console.log(error);
  }
});

before(async () => {
  try {
    const res = await request(app)
      .get('/api/v1/meetups')
      .send({ token: superUserToken });
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual('no meetup yet');
  } catch (error) {
    console.log(error);
  }
});

describe('Meetup Test', () => {
  describe('Create meetup', () => {
    it('should respond with 200', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups')
          .set('Accept', 'application/json')
          .send({
            token: superUserToken,
            topic: 'Andela Bootcamp1',
            location: 'test',
            happeningOn: 'Jan 4 2019',
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Meetup was created successfully');
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with 200', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups')
          .set('Accept', 'application/json')
          .send({
            token: superUserToken,
            topic: 'Andela Bootcamp1',
            location: 'test',
            happeningOn: 'Jan 4 2019',
          });
        expect(res.statusCode).toEqual(409);
        expect(res.body.error).toEqual('Meetup already exists');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Get meetup', async () => {
    it('should get all meetup', async () => {
      try {
        const res = await request(app)
          .get('/api/v1/meetups/')
          .set('Accept', 'application/json')
          .send({ token: superUserToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('All meetups was retrieved successfully');
      } catch (error) {
        console.log(error);
      }
    });
    it('should meetup by Id', async () => {
      try {
        const res = await request(app)
          .get('/api/v1/meetups/1')
          .set('Accept', 'application/json')
          .send({ token: superUserToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Meetup was retrieved');
      } catch (error) {
        console.log(error);
      }
    });
    it('should meetup not found', async () => {
      try {
        const res = await request(app)
          .get('/api/v1/meetups/2')
          .set('Accept', 'application/json')
          .send({ token: superUserToken });
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('meetup not found');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Question server', () => {
    it('should respond with status code 201 created', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups/1/questions')
          .send({ token: superUserToken, title: 'test title', body: 'test body' })
          .expect(201);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Question was created successfully');
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with status code not created', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups/1/questions')
          .send({ token: superUserToken, title: 'test title', body: 'test body' })
          .expect(409);
        expect(res.statusCode).toEqual(409);
        expect(res.body.error).toEqual('Question already exists');
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with status code 200 ', async () => {
      try {
        const res = await request(app)
          .get('/api/v1/questions/1')
          .send({ token: superUserToken })
          .expect(200);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Question was retrieved');
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with status code 404 ', async () => {
      try {
        const res = await request(app)
          .get('/api/v1/questions/2')
          .send({ token: superUserToken })
          .expect(404);
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Question not found');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
