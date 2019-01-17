import pool from './connection';
import helpers from '../helpers/index.helpers';

const { regex } = helpers;

class Comment {
  static async create({
    createdBy,
    questionId,
    body,
  }) {
    try {
      const client = await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO comments (createdby, question_id, body) VALUES($1, $2, $3) RETURNING *',
        values: [createdBy, questionId, regex(body)],
      };
      const res = await client.query(insertQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async getAll(id) {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM comments WHERE question_id = $1',
        values: [id],
      };
      const res = await client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default Comment;
