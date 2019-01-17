import authentication from '../helpers/authenticate';
import Question from '../models/questionModel';


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
    try {
      const { title, body } = req.body;
      const token = req.body.token || req.headers.token;
      const meetup = req.body.id;
      const decodedToken = await decode(token);
      const createdBy = decodedToken.id;
      const question = await Question.create({
        createdBy, meetup, title, body,
      });

      const { rows, constraint } = question;

      if (constraint === 'questions_title_key') {
        return res.status(409).send({ status: 409, error: 'Question already exists' });
      }
      if (rows) {
        return res.status(201).send({ status: 201, data: [rows[0]], message: 'Question was created successfully' });
      }
      return res.status(404).send({ status: 404, error: 'Question not created' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
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

  static async getQuestionById(req, res) {
    try {
      const { id } = req.params;
      const meetup = await Question.getById(id);

      const { rows } = meetup;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'Question was retrieved',
        });
      }
      return res.status(404).send({ status: 404, error: 'Question not found' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
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
  static async upVoteQuestion(req, res) {
    try {
      const { id } = req.params;

      const question = await Question.upVote(id);

      const { rows } = question;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'Upvoted',
        });
      }
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
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
    try {
      const { id } = req.params;

      const question = await Question.downVote(id);

      const { rows } = question;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'Downvoted',
        });
      }
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }
}

export default QuestionController;
