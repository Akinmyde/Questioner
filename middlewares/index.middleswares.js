import isEmpty from 'lodash.isempty';
import validate from 'validate.js';

const constraints = {
  from: {
    email: true,
  },
};

export default class Middleware {
  static validateParams(req, res, next) {
    const { id } = req.params;
    const verifyId = parseInt(id, 10);
    if (!validate.isInteger(verifyId)) {
      return res.status(400).send({
        status: 400,
        error: 'Invalid parameter',
      });
    }
    return next();
  }

  static validateUserSignin(req, res, next) {
    const { email, password } = req.body;
    const error = {};
    if (!email || (email && validate.isEmpty(email))) {
      error.email = 'username or email is required';
    }

    if (email && !validate.isString(email)) {
      error.email = 'email must be a string';
    }

    if (!password || (password && validate.isEmpty(password))) {
      error.password = 'password is required';
    }

    if (password && !validate.isString(password)) {
      error.password = 'password must be a string';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static validateUserSignup(req, res, next) {
    const { email, username, password } = req.body;
    const error = {};
    if (!email || (email && (validate({ from: email }, constraints)))) {
      validate.validators.email.message = 'not a valid email';
      error.email = validate.validators.email.message;
    }

    if (!username || (username && validate.isEmpty(username))) {
      error.username = 'username is required';
    }

    if (username && !validate.isString(username)) {
      error.username = 'username must be a string';
    }

    if (!password || (password && validate.isEmpty(password))) {
      error.password = 'password is required';
    }

    if (password && !validate.isString(password)) {
      error.password = 'password must be a string';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static createQuestionValidator(req, res, next) {
    const { title, body } = req.body;
    const error = {};
    if (!title || (title && validate.isEmpty(title))) {
      error.title = 'title is required';
    }

    if (title && !validate.isString(title)) {
      error.title = 'title must be a string';
    }

    if (!body || (body && validate.isEmpty(body))) {
      error.body = 'question body is required';
    }

    if (body && !validate.isString(body)) {
      error.body = 'question body must be a string';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static createMeetupValidator(req, res, next) {
    const { topic, location, happeningOn } = req.body;
    const error = {};
    if (!topic || (topic && validate.isEmpty(topic))) {
      error.topic = 'topic is required';
    }

    if (topic && !validate.isString(topic)) {
      error.topic = 'topic must be a string';
    }

    if (!location || (location && validate.isEmpty(location))) {
      error.location = 'location is required';
    }

    if (location && !validate.isString(location)) {
      error.location = 'location must be a string';
    }

    if (!happeningOn || (happeningOn && validate.isEmpty(happeningOn))) {
      error.happeningOn = 'meetup date is required';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static addCommentValidator(req, res, next) {
    const { body } = req.body;

    if (!body || (body && validate.isEmpty(body))) {
      return res.status(400).send({
        status: 400,
        error: 'comment body is required',
      });
    }

    if (body && !validate.isString(body)) {
      return res.status(400).send({
        status: 400,
        error: 'comment body must be a string',
      });
    }
    return next();
  }
}
