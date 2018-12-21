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
      id: 2,
      createdOn: Date.now(),
      topic: 'Andela\'s Bootcamp',
      happeningOn: '12/12/2018',
      location: 'Epic tower',
      images: ['image'],
      tags: ['programmer, developer'],
    };
    const nonAcceptedData = {
      id: 2,
      createdOn: Date.now(),
      // topic: 'Andela\'s Bootcamp',
      happeningOn: '12/12/2018',
      location: 'Epic tower',
      images: ['image'],
      tags: ['programmer, developer'],
    };
    it('respond with status code 201 created', (done) => {
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
    it('respond with status code 400 not created', (done) => {
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
  describe('GET /meetups', () => {
    it('respond with 200 and all meetups', (done) => {
      request(app)
        .get('/api/v1/meetups')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ status: 200, data: meetups });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
