/* eslint-env mocha */

import request from 'supertest';
import expect from 'expect';
import app from '../app';


request.agent(app.listen());

describe('Middleware test', () => {
  describe('Validate User Signup', () => {
    it('should return status code 400 if email not provided', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: '',
          username: 'test',
          password: 'testing',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { email: 'not a valid email' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if username not provided', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: 'test@gmail.com',
          username: '',
          password: 'testing',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { username: 'username is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if password not provided', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: 'test@gmail.com',
          username: 'testmaster',
          password: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { password: 'password is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if password is not a string', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: 'test@gmail.com',
          username: 'testmaster',
          password: [''],
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { password: 'password must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if email is not a string', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: ['test@gmail.com'],
          username: 'testmaster',
          password: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { email: 'not a valid email' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if username is not a string', (done) => {
      request(app)
        .post('/api/v1/auth/sign-up')
        .send({
          email: 'test@gmail.com',
          username: ['testmaster'],
          password: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { username: 'username must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate User Signin', () => {
    it('should return status code 400 if username not provided', (done) => {
      request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: '',
          password: 'testing',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { email: 'username or email is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if password not provided', (done) => {
      request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'testman@gmail.com',
          password: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { password: 'password is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if username is not a string', (done) => {
      request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: ['testmaster'],
          password: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { email: 'email must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if username is not a string', (done) => {
      request(app)
        .post('/api/v1/auth/sign-in')
        .send({
          email: 'testmaster',
          password: ['test'],
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { password: 'password must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate Create Question', () => {
    it('should return status code 400 if title not provided', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send({
          title: '',
          body: 'mybody test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { title: 'title is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if body not provided', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send({
          title: 'test title',
          body: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { body: 'question body is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if title is not a string', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send({
          title: ['test title'],
          body: 'testing',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { title: 'title must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if question body is not a string', (done) => {
      request(app)
        .post('/api/v1/questions')
        .send({
          title: 'test title',
          body: ['testing'],
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { body: 'question body must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate Create Meetup', () => {
    it('should return status code 400 if title not provided', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send({
          topic: '',
          location: 'test location',
          happeningOn: '1/1/2001',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { topic: 'topic is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if location not provided', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send({
          topic: 'test title',
          location: '',
          happeningOn: '1/1/2001',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { location: 'location is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if date not provided', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send({
          topic: 'test title',
          location: 'test location',
          happeningOn: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { happeningOn: 'meetup date is required' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if topic is not a string', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send({
          topic: ['test title'],
          location: 'test location',
          happeningOn: '12-12-12',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { topic: 'topic must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if location is not a string', (done) => {
      request(app)
        .post('/api/v1/meetups')
        .send({
          topic: 'test title',
          location: ['test location'],
          happeningOn: '12-12-12',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: { location: 'location must be a string' }, status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate Params', () => {
    it('should return status 400 if params is invalid', (done) => {
      request(app)
        .get('/api/v1/meetups/abc')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ status: 400, error: 'Invalid parameter' });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate Add Comment', () => {
    it('should return status code 400 if body not provided', (done) => {
      request(app)
        .post('/api/v1/questions/1/comments')
        .send({
          body: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'comment body is required', status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 if body is not a string', (done) => {
      request(app)
        .post('/api/v1/questions/1/comments')
        .send({
          body: ['test body'],
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'comment body must be a string', status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Validate Rsvp', () => {
    it('should return status code 400 if response not provided', (done) => {
      request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send({ response: '' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'response is required', status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return status code 400 if response is not a string', (done) => {
      request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send({ response: ['yes'] })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'response must be a string', status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });

    it('should return status code 400 if response yes || no || maybe', (done) => {
      request(app)
        .post('/api/v1/meetups/1/rsvps')
        .send({ response: 'yesss' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({ error: 'response must be either yes, no or maybe', status: 400 });
        })
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});
