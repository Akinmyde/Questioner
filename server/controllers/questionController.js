import authentication from '../helpers/authenticate';

import pool from '../config/connection';
import helpers from '../helpers/validation';

const { regex } = helpers;


const { decode } = authentication;

/* This class contains the logic for Questions */
class QuestionController {
  /**
 * @description - this method create a question
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async createQuestion(req, res) {
    const client = await pool.connect();
    try {
      const { title, body } = req.body;
      const token = req.body.token || req.headers.token;
      const { meetup } = req.body;
      const decodedToken = await decode(token);
      const createdBy = decodedToken.id;
      const findMeetupQuery = { text: 'SELECT FROM meetups WHERE id = $1', values: [meetup] };
      const meetupFound = await client.query(findMeetupQuery);
      if (meetupFound.rowCount === 0) { return res.status(404).send({ status: 404, error: 'There is no meetup associated with that Id' }); }
      const createQuestionQuery = { text: 'INSERT INTO questions (createdby, meetup, title, body) VALUES($1, $2, $3, $4) RETURNING *', values: [createdBy, meetup, regex(title), regex(body)] };
      const question = await client.query(createQuestionQuery);
      if (question.rows) { return res.status(201).send({ status: 201, data: [question.rows[0]], message: 'Question was created successfully' }); }
      return res.status(204).send({ status: 204, error: 'Question not created' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
* @description - this method get all questions
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static async getAllQuestion(req, res) {
    const client = await pool.connect();
    try {
      const allQuestionsQuery = {
        text: 'SELECT COUNT(*) FROM questions',
        values: [],
      };
      const questions = await client.query(allQuestionsQuery);
      const { rows } = questions;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'All questions was retrieved' });
      }
      return res.send({ status: 204, data: [], error: 'no questions yet' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
* @description - this method get a question by it's id
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static async QuestionById(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const getQuery = { text: 'SELECT * FROM questions WHERE ID = $1', values: [id] };
      const questionFound = await client.query(getQuery);
      const { rows } = questionFound;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'Question was retrieved' });
      }
      return res.status(404).send({ status: 404, error: 'Question not found' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
  * @description - this method get all questions related to a meetup
  *
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  *
  * @returns {object} - status message and response
  */

  static async getQuestionByMeetup(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const getQuestionByIdQuery = {
        text: 'SELECT * FROM questions WHERE meetup = $1',
        values: [id],
      };
      const questionFound = await client.query(getQuestionByIdQuery);
      const { rows } = questionFound;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'Question was retrieved',
        });
      }
      return res.status(404).send({ status: 404, error: 'No question yet for this meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
 * @description - this method upvote a questiom
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async upVote(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const getQuestion = { text: 'SELECT * FROM questions WHERE ID = $1', values: [id] };
      const questionFound = await client.query(getQuestion);
      if (questionFound.rowCount === 0) { return res.status(404).send({ status: 404, error: 'Question not found' }); }
      questionFound.rows[0].upvotes += 1;
      if (questionFound.rows[0].downvotes <= 0) {
        questionFound.rows[0].downvotes = 0;
      } else { questionFound.rows[0].downvotes -= 1; }
      const upvoteQuery = { text: 'UPDATE questions  SET upvotes = $1, downvotes = $2 WHERE id = $3 RETURNING *', values: [questionFound.rows[0].upvotes, questionFound.rows[0].downvotes, id] };
      const upvote = await client.query(upvoteQuery);
      const { rows } = upvote;
      if (rows.length > 0) { return res.status(200).send({ status: 200, data: rows, message: 'Upvoted' }); }
      return res.status(204).send({ status: 204, data: rows, message: 'Question not upvoted, try again' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
* @description - this method downvote a questiom
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static async downVoteQuestion(req, res) {
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const getQuestionQuery = { text: 'SELECT * FROM questions WHERE ID = $1', values: [id] };
      const questionFound = await client.query(getQuestionQuery);
      if (questionFound.rowCount === 0) { return res.status(404).send({ status: 404, error: 'Question not found' }); }
      questionFound.rows[0].downvotes += 1;
      if (questionFound.rows[0].upvotes <= 0) {
        questionFound.rows[0].upvotes = 0;
      } else { questionFound.rows[0].upvotes -= 1; }
      const downvoteQuery = { text: 'UPDATE questions  SET upvotes = $1, downvotes = $2 WHERE id = $3 RETURNING *', values: [questionFound.rows[0].upvotes, questionFound.rows[0].downvotes, id] };
      const downvote = await client.query(downvoteQuery);
      const { rows } = downvote;
      if (rows.length > 0) { return res.status(200).send({ status: 200, data: rows, message: 'Downvoted' }); }
      return res.status(204).send({ status: 204, data: rows, message: 'Question not Downvoted, try again' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      client.release();
    }
  }

  /**
* @description - this method get all questions by user id
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
* */
  static async getQuestionByUserId(req, res) {
    const client = await pool.connect();
    try {
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const userId = decodedToken.id;
      const selectQuery = {
        text: 'SELECT COUNT (*) FROM questions WHERE createdby = $1',
        values: [userId],
      };
      const comments = await client.query(selectQuery);
      const { rows } = comments;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'All questions was retrieved' });
      }
      return res.send({ status: 204, data: [], error: 'no question yet' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }
}

export default QuestionController;
