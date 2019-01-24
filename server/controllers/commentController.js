import authentication from '../helpers/authenticate';
import pool from '../config/connection';
import helpers from '../helpers/validation';

const { regex } = helpers;

const { decode } = authentication;

/* This class contains the logic for comments */
class CommentController {
  /**
 * @description - this method create a comment
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */

  static async addComment(req, res) {
    const client = await pool.connect();
    try {
      const { body } = req.body;
      const questionId = req.params.id;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const createdBy = decodedToken.id;
      const insertQuery = {
        text: 'INSERT INTO comments (createdby, questionid, body) VALUES($1, $2, $3) RETURNING *',
        values: [createdBy, questionId, regex(body)],
      };
      const comment = await client.query(insertQuery);
      const { rows } = comment;
      if (rows) {
        return res.status(201).send({ status: 201, data: rows, message: 'comment was created' });
      }
      return res.status(204).send({ status: 204, message: 'comment not created' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error ' });
    } finally {
      await client.release();
    }
  }

  /**
 * @description - this method get all comment
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async getAllComment(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const questionQuery = {
        text: 'SELECT * FROM questions WHERE ID = $1',
        values: [id],
      };
      const question = await client.query(questionQuery);
      if (question.rows.length > 0) {
        const commentQuery = {
          text: 'SELECT * FROM comments WHERE questionid = $1',
          values: [id],
        };
        const comment = await client.query(commentQuery);
        const { rows } = comment;
        if (rows.length > 0) {
          return res.status(200).send({ status: 200, data: rows, message: 'All comment was retrieved successfully' });
        }
        return res.send({ status: 204, error: 'no comment for this question yet' });
      }
      return res.status(404).send({ status: 404, error: 'There are no comment for that id' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }
}

export default CommentController;
