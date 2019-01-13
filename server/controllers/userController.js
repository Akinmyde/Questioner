import passwordHash from 'password-hash';
import authentication from '../helpers/authentication/authenticate';
import db from '../models/index.models';
import 'babel-polyfill';
import User from '../models/userModel';

const { authToken } = authentication;


// const { dateFormater } = helpers;

/* This class contains the logic for Users */

class UserController {
  /**
* @description - this method creates a user
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = User.create({
        email: email.trim(),
        username: username.trim(),
        password: passwordHash.generate(password.trim()),
        isAdmin: false,
      });
      const { rows, constraint } = await user;
      if (rows) {
        const token = authToken(rows[0].id);
        return res.status(201).send({ status: 201, data: [{ token, user: rows[0] }] });
      }
      if (constraint === 'users_email_key') {
        return res.status(409).send({ status: 409, error: 'Email already exists' });
      }
      if (constraint === 'users_username_key') {
        return res.status(409).send({ status: 409, error: 'Username already exists' });
      }
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Unexpected database error occur' });
    }
    return res.status(500).send({ status: 500, error: 'Internal server error' });
  }


  /**
* @description - this method sign-in a user
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static signIn(req, res) {
    const { email, password } = req.body;
    const userFound = db.users.find(
      user => (user.email === email.trim()
        || user.username === email.trim())
        && (user.password === password.trim()),
    );
    if (userFound) {
      return res.status(200).send({
        status: 200,
        message: 'Login was successfull',
      });
    }
    return res.status(401).send({
      status: 401,
      error: 'Login failed',
    });
  }
}

export default UserController;
