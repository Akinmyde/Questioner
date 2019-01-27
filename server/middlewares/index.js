import isEmpty from 'lodash.isempty';
import validate from 'validate.js';
import { cloudinaryDelete } from '../config/cloudinary';
import authentication from '../helpers/authenticate';

const { decode } = authentication;

const constraints = {
  from: {
    email: true,
  },
};

export default class Middleware {
  static isLogin(req, res, next) {
    const token = req.body.token || req.headers.token;

    try {
      if (validate.isEmpty(token)) {
        return res.status(401).send({
          status: 401,
          error: 'Unauthorized',
        });
      }
      const decodedToken = decode(token);
      if (decodedToken.id) {
        return next();
      }
    } catch (err) {
      return res.status(401).send({
        status: 401,
        error: 'Unauthorized',
      });
    }

    return next();
  }

  static isArray(req, res, next) {
    const arrayValues = req.body.tags || req.body.images;
    if (!validate.isArray(arrayValues) || validate.isEmpty(arrayValues)) {
      return res.status(400).send({
        status: 400,
        error: 'Field is required and must be an array',
      });
    }
    for (let i = 0; i < arrayValues.length; i += 1) {
      if (validate.isEmpty(arrayValues[i])) {
        return res.status(400).send({
          status: 400,
          error: 'Array field should not be empty',
        });
      }
    }
    return next();
  }

  static validateImage(req, res, next) {
    const { files, file, typeError } = req;
    const images = files || file;
    if (typeError) {
      images.forEach(image => cloudinaryDelete(image.public_id));
      return res.status(403).send({ error: typeError });
    }
    return next();
  }

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
    const { username, password } = req.body;
    const error = {};

    if (!validate.isString(username) || validate.isEmpty(username)) {
      error.username = 'username is required and must be a string';
    }

    if (!validate.isString(password) || validate.isEmpty(password)) {
      error.password = 'password is required and must be a string';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static validateUserProfile(req, res, next) {
    const { firstName, lastName, phoneNumber } = req.body;
    const error = {};

    if (!validate.isString(firstName) || validate.isEmpty(firstName)) {
      error.firstName = 'firstName is required and must be a string';
    }

    if (!validate.isString(lastName) || validate.isEmpty(lastName)) {
      error.lastName = 'lastName is required and must be a string';
    }

    if (!validate.isString(phoneNumber) || validate.isEmpty(phoneNumber)) {
      error.phoneNumber = 'phoneNumber is required and must be valid';
    }

    if (isEmpty(error)) {
      return next();
    }

    return res.status(400).send({
      status: 400,
      error,
    });
  }

  static validateForgetPassword(req, res, next) {
    const { email } = req.body;
    if (!email || validate({ from: email }, constraints)) {
      return res.status(400).send({ status: 400, error: 'email is required and must be valid' });
    }
    return next();
  }

  static validateResetPassword(req, res, next) {
    const { password } = req.body;
    if (!validate.isString(password) || validate.isEmpty(password)) {
      return res.status(400).send({ status: 400, error: 'password is required and must be a string' });
    }
    if (password.length < 8) {
      return res.status(400).send({ status: 400, error: 'Password lenght is too short, it should be at least 8 character long' });
    }
    return next();
  }

  static validateUserSignup(req, res, next) {
    const { email, username, password } = req.body;
    const error = {};
    if (!email || validate({ from: email }, constraints)) {
      validate.validators.email.message = 'email is required and must be valid';
      error.email = validate.validators.email.message;
    }

    if (!validate.isString(username) || validate.isEmpty(username)) {
      error.username = 'username is required and must be a string';
    }

    if (!validate.isString(password) || validate.isEmpty(password)) {
      error.password = 'password is required and must be a string';
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
    const { meetup, title, body } = req.body;
    const error = {};

    if (!validate.isInteger(meetup)) {
      error.meetup = 'Meetup id must be an integer';
    }

    if (!meetup) {
      error.meetup = 'Meetup id is required';
    }

    if (!validate.isString(title) || validate.isEmpty(title)) {
      error.title = 'title is required and must be a string';
    }

    if (!validate.isString(body) || validate.isEmpty(body)) {
      error.body = 'question body is required and must be a string';
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

    if (!validate.isString(topic) || validate.isEmpty(topic)) {
      error.topic = 'topic is required and must be a string';
    }

    if (!validate.isString(location) || validate.isEmpty(location)) {
      error.location = 'location is required and must be a string';
    }

    if (!validate.isString(happeningOn)) {
      error.happeningOn = 'happeningOn is required and must be a Date';
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

    if (!validate.isString(body) || validate.isEmpty(body)) {
      return res.status(400).send({
        status: 400,
        error: 'comment body is required and must be a string',
      });
    }
    return next();
  }

  static valideateRsvp(req, res, next) {
    const { response } = req.body;

    if (!validate.isString(response) || validate.isEmpty(response)) {
      return res.status(400).send({
        status: 400,
        error: 'response is required and must be a string',
      });
    }

    if (response.toLowerCase() === 'yes' || response.toLowerCase() === 'no'
      || response.toLowerCase() === 'maybe') {
      return next();
    }
    return res.status(400).send({
      status: 400,
      error: 'response must be either yes, no or maybe',
    });
  }
}
