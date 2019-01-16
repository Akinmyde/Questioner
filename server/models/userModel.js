import pool from './connection';

class User {
  static async create({
    email,
    username,
    password,
    isAdmin,
  }) {
    try {
      const client = await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO users(email, username, password, isAdmin) VALUES($1, $2, $3, $4) RETURNING *',
        values: [email.trim(), username.trim(), password.trim(), isAdmin],
      };
      const res = await client.query(insertQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async signIn({ username }) {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM users WHERE username = $1 OR email = $1',
        values: [username.trim()],
      };
      const res = await client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default User;
