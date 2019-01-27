import passwordHash from 'password-hash';
import authentication from '../helpers/authenticate';
import pool from '../config/connection';
import helpers from '../helpers/validation';
import notification from '../helpers/notification';

const { regex } = helpers;
const { encode, decode } = authentication;

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
    const client = await pool.connect();
    try {
      const { username, email, password } = req.body;
      let hashedPassword = password.trim();
      hashedPassword = passwordHash.generate(password);
      const signUpUserQuery = {
        text: 'INSERT INTO users(email, username, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING id, email, username, registered, lastlogin, isadmin',
        values: [email.trim(), username.trim(), hashedPassword, false],
      };
      const user = await client.query(signUpUserQuery);
      const { rows } = user;
      if (rows) {
        const token = encode(rows[0].id, rows[0].isadmin);
        await notification.signUp(email);
        return res.status(201).send({ status: 201, data: [{ token, user: rows[0] }], message: 'Registration was successfull' });
      }
      return res.status(204).send({ status: 204, error: 'User account not created, try again' });
    } catch (err) {
      const { constraint } = err;
      if (constraint === 'users_email_key') {
        return res.status(409).send({ status: 409, error: 'Email already exists' });
      }
      if (constraint === 'users_username_key') {
        return res.status(409).send({ status: 409, error: 'Username already exists' });
      }
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
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
    const client = await pool.connect();
    try {
      const { username, password } = req.body;
      const loginQuery = {
        text: 'SELECT * FROM users WHERE username = $1 OR email = $1',
        values: [username.trim()],
      };
      const user = await client.query(loginQuery);
      const { rows, rowCount } = user;
      if (rowCount === 0) {
        return res.status(401).send({ status: 401, error: 'Invalid username or password' });
      }
      if (passwordHash.verify(password.trim(), rows[0].password)) {
        const token = encode(rows[0].id, rows[0].isadmin);
        const updateQuery = {
          text: 'UPDATE users SET lastlogin = CURRENT_DATE WHERE id = $1 RETURNING email, username, registered, lastlogin, isadmin',
          values: [rows[0].id],
        };
        const updatedUser = await client.query(updateQuery);
        return res.status(200).send({ status: 200, data: [{ token, user: updatedUser.rows[0], message: 'Login was successful' }] });
      } return res.status(401).send({ status: 401, error: 'Invalid username or password' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  static async profile(req, res) {
    const client = await pool.connect();
    try {
      const { firstName, lastName, phoneNumber } = req.body;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const userId = decodedToken.id;

      const updateUserQuery = {
        text: 'UPDATE users SET firstname = $1, lastname = $2, phonenumber = $3, updatedon = CURRENT_DATE WHERE id = $4 RETURNING firstname, lastname, phonenumber, updatedon',
        values: [regex(firstName), regex(lastName), regex(phoneNumber), userId],
      };
      const updatedUser = await client.query(updateUserQuery);
      const { rows, rowCount } = updatedUser;

      if (rowCount === 1) {
        return res.status(200).send({ status: 200, data: rows, message: 'User profile was updated' });
      }
      return res.send({ status: 204, error: 'User profile not updated, try again' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  static async forgetPassword(req, res) {
    const client = await pool.connect();
    try {
      const { email } = req.body;
      const findUserQuery = {
        text: 'SELECT email from users WHERE email = $1',
        values: [email],
      };
      const user = await client.query(findUserQuery);
      const { rowCount } = user;

      if (rowCount === 1) {
        const url = `${req.protocol}://${req.get('host')}/api/v1/auth/reset/`;
        notification.forgetPassword(email, url);
        return res.status(200).send({ status: 200, message: 'Check you email for the next step' });
      }
      return res.status(404).send({ status: 404, error: 'User not found' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  static async resetPassword(req, res) {
    const client = await pool.connect();
    try {
      const { token } = req.params;
      const decodedToken = await decode(token);
      const { email } = decodedToken;

      if (email) {
        const { password } = req.body;
        let hashedPassword = password.trim();
        hashedPassword = await passwordHash.generate(password);
        const updateUserQuery = {
          text: 'UPDATE users SET password = $1, updatedon = CURRENT_DATE WHERE email = $2',
          values: [hashedPassword, email],
        };
        const user = await client.query(updateUserQuery);
        const { rowCount } = user;

        if (rowCount === 1) {
          notification.passwordReset(email);
          return res.status(200).send({ status: 200, message: 'Your password was changed' });
        }
        return res.status(204).send({ status: 204, error: 'Password not change, please try again' });
      }
      return res.status(404).send({ status: 404, error: 'link is invalid or it may has expired' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }
}

export default UserController;
