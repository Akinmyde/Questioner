/* eslint-env mocha */

const request = require('supertest');
const expect = require('expect');
const app = require('../app');
const { meetup } = require('../db/index.db');

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
        .expect((res) => {
          expect(res.body).toEqual({ status: 200, data: meetup });
        })
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
  // test create a question
  describe('POST /question', () => {
    const acceptedData = {
      id: 1,
      createdOn: Date,
      createdBy: 21, // represents the user asking the question
      meetup: 11, // represents the meetup the question is for
      title: 'What Do I Need To Do To Succeed In The Bootcamp',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
      vote: 0,
    };
    const nonAcceptedData = {
      id: 1,
      createdOn: Date,
      createdBy: 21, // represents the user asking the question
      meetup: 11, // represents the meetup the question is for
      // title: 'What Do I Need To Do To Succeed In The Bootcamp',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
      vote: 0,
    };

    it('should respond with status code 201 created', (done) => {
      request(app)
        .post('/api/v1/questions')
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
        .post('/api/v1/questions')
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

  // test for patch question:id/upvote
  describe('PATCH /question/:id/upvote', () => {
    it('should respond with 204', (done) => {
      request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message question not found', (done) => {
      request(app)
        .patch('/api/v1/questions/4/upvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'question not found' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // test for patch question:id/downvote
  describe('PATCH /question/:id/downvote', () => {
    it('should respond with status code 200', (done) => {
      request(app)
        .patch('/api/v1/questions/1/downvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message question not found', (done) => {
      request(app)
        .patch('/api/v1/questions/4/downvote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'question not found' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // test for post meetup/:id/rsvp
  describe('POST /meetups/:id/rsvps', () => {
    const acceptedData = {
      response: 'yes' || 'no' || 'maybe',
    };
    const nonAcceptedData = {
      response: '' || 'YES' || 'Maybe',
    };
    it('should respond with status code 201', (done) => {
      request(app)
        .post('/api/v1/meetups/1/rsvps')
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
        .post('/api/v1/meetups/1/rsvps')
        .send(nonAcceptedData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message meetup not found', (done) => {
      request(app)
        .post('/api/v1/meetups/4/rsvps')
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
