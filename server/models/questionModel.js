import pool from './connection';

class Question {
  static async create({
    createdBy,
    meetup,
    title,
    body,
  }) {
    try {
      const client = await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO questions (createdby, meetup, title, body) VALUES($1, $2, $3, $4) RETURNING *',
        values: [createdBy, meetup, title, body],
      };
      const res = await client.query(insertQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async getById(id) {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM questions WHERE ID = $1',
        values: [id],
      };
      const res = client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async upVote(id) {
    try {
      const question = await this.getById(id);
      if (question.rowCount === 0) {
        return 'Question not found';
      }
      question.rows[0].votes += 1;
      question.rows[0].upvotes += 1;
      const client = await pool.connect();
      const updateQuery = {
        text: 'UPDATE questions  SET upvotes = $1, votes = $2 WHERE id = $3 RETURNING *',
        values: [question.rows[0].votes, question.rows[0].upvotes, id],
      };
      const res = await client.query(updateQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async downVote(id) {
    try {
      const question = await this.getById(id);
      if (question.rowCount === 0) {
        return 'Question not found';
      }
      question.rows[0].votes -= 1;
      question.rows[0].downvotes += 1;
      const client = await pool.connect();
      const updateQuery = {
        text: 'UPDATE questions  SET upvotes = $1, votes = $2 WHERE id = $3 RETURNING *',
        values: [question.rows[0].votes, question.rows[0].downvotes, id],
      };
      const res = await client.query(updateQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default Question;
