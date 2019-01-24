import passwordHash from 'password-hash';
import authentication from '../helpers/authenticate';
import pool from '../config/connection';

const { encode } = authentication;

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
        text: 'INSERT INTO users(email, username, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING email, username, registered, lastlogin, isadmin',
        values: [email.trim(), username.trim(), hashedPassword, false],
      };
      const user = await client.query(signUpUserQuery);
      const { rows } = user;
      if (rows) {
        const token = encode(rows[0].id, rows[0].isadmin);
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
}

export default UserController;
