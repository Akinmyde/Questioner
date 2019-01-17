import passwordHash from 'password-hash';
import authentication from '../helpers/authenticate';
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
      const isAdmin = req.body.isAdmin || false;
      const user = await User.create({
        email,
        username,
        password: passwordHash.generate(password),
        isAdmin,
      });
      const { rows, constraint } = user;
      if (rows) {
        const token = authToken(rows[0].id, rows[0].isadmin);
        return res.status(201).send({ status: 201, data: [{ token, user: rows[0] }], message: 'Registration was successfull' });
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
  static async signIn(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.signIn({ username });
      const { rows, rowCount } = user;

      if (rowCount === 0) {
        return res.status(404).send({
          status: 404,
          error: 'There is no user with this credentials',
        });
      }
      if (passwordHash.verify(password.trim(), rows[0].password)) {
        const token = authToken(rows[0].id, rows[0].isadmin);
        return res.status(200).send({ status: 200, data: [{ token, user: rows[0], message: 'Login was successful' }] });
      }
      return res.status(401).send({ status: 401, error: 'Invalid username or password' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }
}

export default UserController;
