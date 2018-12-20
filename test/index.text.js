/* eslint-env mocha */

const request = require('supertest');
const app = require('../app');

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
    it('respond with 201 created', (done) => {
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
    it('respond with 400 not created', (done) => {
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
});
