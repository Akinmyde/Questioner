/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';
import app from '../app';
import db from '../models/index.models';
import helper from '../helpers/index.helpers';

const { dateFormater } = helper;
request.agent(app.listen());

// Testing for Questioner Server
describe('Questioner Server', () => {
  describe('Get /', () => {
    it('should respond with status code 200', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  // test create a meetup
  describe('POST /meetups', () => {
    const testData = {
      id: 3,
      createdOn: dateFormater(),
      topic: 'Andela\'s Bootcamp',
      happeningOn: '12/12/2018',
      location: 'Epic tower',
      tags: ['programmer, developer'],
    };
    it('should respond with status code 201 created', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({ status: 201, data: [testData] });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with status code 400 not created', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ status: 400, error: 'not created' });
        })
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
          expect(res.body).toEqual({ status: 200, data: db.meetups });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  // test for /meetups/upcoming
  describe('GET /meetups/upcoming', () => {
    it('should respond with 200', (done) => {
      request(app)
        .get('/api/v1/meetups/upcoming')
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
  // test create a question
  describe('POST /questions', () => {
    const testData = {
      id: db.questions.length + 1,
      createdOn: dateFormater(),
      createdBy: db.users[0].id,
      meetup: db.meetups[0].id,
      title: 'How Do I Succeed In The Bootcamp',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
      votes: 0,
    };
    it('should respond with status code 201 created', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({ status: 201, data: [testData] });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should respond with status code 400 question not created', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ status: 400, error: 'question not created' });
        })
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

  // test get question by Id
  describe('GET /question/:id', () => {
    it('should respond with 200 and single question', (done) => {
      request(app)
        .get('/api/v1/questions/1')
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
        .get('/api/v1/questions/4')
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

  // test for post sign-up
  describe('POST /auth/sign-up', () => {
    const user = {
      id: 3,
      email: 'test@gmail.com',
      username: 'test',
      password: 'test',
      registered: dateFormater(),
    };
    it('should respond with status code 201', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({ status: 201, data: [user] });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 409 and message user already exists', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .expect((res) => {
          expect(res.body).toEqual({ status: 409, error: 'user already exists' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
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

  // Delete a meetup record
  describe('DELETE /meetups/:id', () => {
    it('should respond with 200', (done) => {
      request(app)
        .delete('/api/v1/meetups/1')
        .set('Accept', 'application/json')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ status: 200, message: 'Meetup was deleted successfully' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message meetup not found', (done) => {
      request(app)
        .delete('/api/v1/meetups/4')
        .set('Accept', 'application/json')
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
