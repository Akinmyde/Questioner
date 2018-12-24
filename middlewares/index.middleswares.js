import validator from 'validator';
import isEmpty from 'lodash.isempty';
import isInt from 'validator/lib/isInt';

export default class Middleware {
  static validateParams(req, res, next) {
    const { id } = req.params;
    const verifyId = isInt(id);

    if (!verifyId) {
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
    if (!email || (email && validator.isEmpty(email.trim()))) {
      error.email = 'username or email is required';
    }

    if (!password || (password && validator.isEmpty(password.trim()))) {
      error.password = 'password is required';
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
    if (!email || (email && !(validator.isEmail(email)))) {
      error.email = 'use a valid email';
    }

    if (!username || (username && validator.isEmpty(username))) {
      error.username = 'username is required';
    }

    if (!password || (password && validator.isEmpty(password.trim()))) {
      error.password = 'password is required';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static createQuestionController(req, res, next) {
    const { title, body } = req.body;
    const error = {};

    if (!title || (title && validator.isEmpty(title))) {
      error.password = 'title is required';
    }

    if (!body || (body && validator.isEmpty(body))) {
      error.body = 'question body is required';
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

    if (!topic || (topic && validator.isEmpty(topic.trim()))) {
      error.topic = 'topic is required';
    }

    if (!location || (location && validator.isEmpty(location))) {
      error.location = 'location is required';
    }

    if (!happeningOn || (happeningOn && validator.isEmpty(happeningOn))) {
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
}
