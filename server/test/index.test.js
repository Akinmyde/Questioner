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
      tags: [],
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
    it('should respond with status code 409 not created', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .expect((res) => {
          expect(res.body).toEqual({ status: 409, error: 'meetup already created' });
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
      user: db.users[0].id,
      meetup: db.meetups[0].id,
      title: 'How Do I Succeed In The Bootcamp',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
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

    it('should respond with status code 409 question not created', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .expect((res) => {
          expect(res.body).toEqual({ status: 409, error: 'question already created' });
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
      response: ['YES'],
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
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and message meetup not found', (done) => {
      request(app)
        .post('/api/v1/meetups/5/rsvps')
        .send(acceptedData)
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

  // test create a comment
  describe('POST /questions/<questionId>/comments', () => {
    const testData = {
      id: 2,
      createdBy: 1,
      questionId: 1,
      body: 'This is an important question',
      createdOn: dateFormater(),
    };
    it('should respond with status code 201 and Data', (done) => {
      request(app)
        .post('/api/v1/questions/1/comments')
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
        .post('/api/v1/questions/10/comments')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ status: 400, error: 'comment not created' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // test to get all comment
  describe('GET /api/v1/questions/:id/comments', () => {
    it('should respond with 200 and all comment', (done) => {
      request(app)
        .get('/api/v1/questions/1/comments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ status: 200, data: [db.comments] });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  it('should respond with 200 and message no comment yet', (done) => {
    request(app)
      .get('/api/v1/questions/2/comments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ status: 200, error: 'no comment yet' });
      })
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should respond with 404 and message question not found', (done) => {
    request(app)
      .get('/api/v1/questions/10/comments')
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

  // test to get all questions for a meetup
  describe('GET /api/v1/meetups/:id/questions', () => {
    it('should respond with 200 and all questios related to the meetup', (done) => {
      request(app)
        .get('/api/v1/meetups/1/questions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should respond with 404 and questions not found for this meetup', (done) => {
      request(app)
        .get('/api/v1/meetups/10/questions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'questions not found for this meetup' });
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
    it('should respond with 404 and no meetup yet', (done) => {
      db.meetups = [];
      request(app)
        .get('/api/v1/meetups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'no meetup yet' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  // test to for 404 not found
  describe('ALL *', () => {
    it('it should return page not found', (done) => {
      request(app)
        .get('/api/v1/rubbish')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'Sorry, the page you tried cannot be found' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('it should return page not found', (done) => {
      const testData = {
        test: 'test',
      };
      request(app)
        .post('/api/v1/rubbish')
        .send(testData)
        .expect('Content-Type', /json/)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({ status: 404, error: 'Sorry, the page you tried cannot be found' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
