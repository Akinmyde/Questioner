/* eslint-env mocha */

const request = require('supertest');
const expect = require('expect');
const app = require('../app');
const meetups = require('../db/meetups');

request.agent(app.listen());

// Testing for Questioner Server
describe('Questioner Server', () => {
  // test create a meetup
  describe('POST /meetups', () => {
    const acceptedData = {
      id: 1,
      createdOn: Date.now(),
      topic: 'Andela\'s Bootcamp',
      happeningOn: '12/12/2018',
      location: 'Epic tower',
      images: ['image'],
      tags: ['programmer, developer'],
    };
    const nonAcceptedData = {
      id: 1,
      createdOn: Date.now(),
      // topic: 'Andela\'s Bootcamp',
      happeningOn: '12/12/2018',
      location: 'Epic tower',
      images: ['image'],
      tags: ['programmer, developer'],
    };
    it('should respond with status code 201 created', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send(acceptedData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with status code 400 not created', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send(nonAcceptedData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  // test to get all meetups
  describe('GET /meetups', () => {
    it('should respond with 200 and all meetups', (done) => {
      request(app)
        .get('/api/v1/meetups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  // test for get meetup by id
  describe('GET /meetups/:id', () => {
    it('should respond with 200 and single meetup', (done) => {
      request(app)
        .get('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message meetup not found', (done) => {
      request(app)
        .get('/api/v1/meetups/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'meetup not found' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
