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
        values: [email, username, password, isAdmin],
      };
      return await pool.query(insertQuery);
    } catch (err) {
      return (err);
    }
  }
}

export default User;
