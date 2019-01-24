/* eslint-env mocha */
import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../app';
import authentication from '../helpers/authenticate';

const { encode } = authentication;

request.agent(app.listen());

const superUser = {
  email: 'superuser@yahoo.com',
  username: 'superuser',
  password: 'superuserpass',
};

let superUserToken;

before(async () => {
  try {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(superUser);
    res.body.data[0].isadmin = true;
    superUserToken = encode(res.body.data[0].id, res.body.data[0].isadmin);
  } catch (error) {
    console.log(error);
  }
});

before(async () => {
  try {
    const res = await request(app)
      .get('/api/v1/meetups')
      .set('Accept', 'application/json')
      .send({ token: superUserToken });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual(204);
    expect(res.body.message).toEqual('no meetup yet');
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
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(204);
        expect(res.body.message).toEqual('meetup not found');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Add Tag', () => {
    it('should respond with 200', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups/1/tags')
          .set('Accept', 'application/json')
          .send({
            token: superUserToken,
            tags: ['Developer', 'Programmer', 'Epic', 'Bootcamp'],
          });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Tags was added successfully');
      } catch (error) {
        console.log(error);
      }
    });
    it('should respond with 404 and meetup not found', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/meetups/2/tags')
          .set('Accept', 'application/json')
          .send({
            token: superUserToken,
            tags: ['Developer', 'Programmer', 'Epic', 'Bootcamp'],
          });
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Meetup not found');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('Question server', () => {
    it('should respond with status code 201 created', async () => {
      try {
        const res = await request(app)
          .post('/api/v1/questions')
          .send({
            token: superUserToken,
            meetup: 10,
            title: 'test title',
            body: 'test body',
          });
        expect(201);
        expect(res.body.error).toEqual('There is no meetup associated with that Id');
      } catch (error) {
        console.log(error);
      }
    });
  });
  describe('Middleware test', () => {
    describe('Validate isArray', () => {
      it('should return status code 400', (done) => {
        request(app)
          .post('/api/v1/meetups/1/tags')
          .send({ token: superUserToken })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ status: 400, error: 'Field is required and must be an array' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400', (done) => {
        request(app)
          .post('/api/v1/meetups/1/tags')
          .send({ token: superUserToken, tags: 'tag1' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ status: 400, error: 'Field is required and must be an array' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 and message array field should not be empty', (done) => {
        request(app)
          .post('/api/v1/meetups/1/tags')
          .send({ token: superUserToken, tags: ['Tag1', 'Tag2', ''] })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ status: 400, error: 'Array field should not be empty' });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
    });
    describe('Validate User Signup', () => {
      it('should return status code 400 if email not provided', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: '',
            username: 'test',
            password: 'testingv6t7',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { email: 'email is required and must be valid' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if username not provided', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: 'test@gmail.com',
            username: '',
            password: 'testingtyu',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { username: 'username is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if password not provided', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: 'test@gmail.com',
            username: 'testmaster',
            password: '',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { password: 'password is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if password is not a string', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: 'test@gmail.com',
            username: 'testmaster',
            password: ['ghjgjkjl'],
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { password: 'password is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if email is not a string', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: ['test@gmail.com'],
            username: 'testmaster',
            password: 'testings324',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { email: 'email is required and must be valid' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if username is not a string', (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send({
            email: 'test@gmail.com',
            username: ['testmaster'],
            password: 'testxfdwwq',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { username: 'username is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    describe('Validate User Login', () => {
      it('should return status code 400 if username not provided', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            username: '',
            password: 'testing',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { username: 'username is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if password not provided', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            username: 'testman@gmail.com',
            password: '',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { password: 'password is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if username is not a string', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            username: ['testmaster'],
            password: 'test',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { username: 'username is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if password is not a string', (done) => {
        request(app)
          .post('/api/v1/auth/login')
          .send({
            username: 'testmaster',
            password: ['test'],
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { password: 'password is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            meetup: 1,
            title: '',
            body: 'mybody test',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { title: 'title is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            meetup: 1,
            title: 'test title',
            body: '',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { body: 'question body is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            meetup: 1,
            title: ['test title'],
            body: 'testing',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { title: 'title is required and must be a string' }, status: 400 });
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
            meetup: 1,
            token: superUserToken,
            title: 'test title',
            body: ['testing', 'test'],
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { body: 'question body is required and must be a string' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if meetup id not provided', (done) => {
        request(app)
          .post('/api/v1/questions')
          .send({
            token: superUserToken,
            title: 'jghjgkj',
            body: 'mybody test',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { meetup: 'Meetup id is required' }, status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
      it('should return status code 400 if meetup id is not an integer', (done) => {
        request(app)
          .post('/api/v1/questions')
          .send({
            token: superUserToken,
            title: 'sadsafsa',
            body: 'mybody test',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { meetup: 'Meetup id is required' }, status: 400 });
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
            token: superUserToken,
            topic: '',
            location: 'test location',
            happeningOn: '1/1/2001',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { topic: 'topic is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            topic: 'test title',
            location: '',
            happeningOn: '1/1/2001',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { location: 'location is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            topic: ['test title'],
            location: 'test location',
            happeningOn: '12-12-12',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { topic: 'topic is required and must be a string' }, status: 400 });
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
            token: superUserToken,
            topic: 'test title',
            location: ['test location'],
            happeningOn: '12-12-12',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: { location: 'location is required and must be a string' }, status: 400 });
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
          .send({ token: superUserToken })
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
            token: superUserToken,
            body: '',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: 'comment body is required and must be a string', status: 400 });
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
            token: superUserToken,
            body: ['test body'],
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: 'comment body is required and must be a string', status: 400 });
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
          .send({ response: '', token: superUserToken })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: 'response is required and must be a string', status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });

      it('should return status code 400 if response is not a string', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send({ response: ['yes'], token: superUserToken })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect((res) => {
            expect(res.body).toEqual({ error: 'response is required and must be a string', status: 400 });
          })
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });

      it('should return status code 400 if response yes || no || maybe', (done) => {
        request(app)
          .post('/api/v1/meetups/1/rsvps')
          .send({ response: 'yesss', token: superUserToken })
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
});
