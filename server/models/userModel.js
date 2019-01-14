import pool from './connection';

class User {
  static async create({
    email,
    username,
    password,
    isAdmin,
  }) {
    try {
      await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO users(email, username, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING *',
        values: [email.trim(), username.trim(), password.trim(), isAdmin],
      };
      return await pool.query(insertQuery);
    } catch (err) {
      return err;
    }
  }

  static async signIn({ username }) {
    try {
      await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM users WHERE username = $1 OR email = $1',
        values: [username.trim()],
      };
      return await pool.query(selectQuery);
    } catch (err) {
      return err;
    }
  }
}

export default User;
