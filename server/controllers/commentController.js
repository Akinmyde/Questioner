import Comment from '../models/commentModel';
import Question from '../models/questionModel';
import authentication from '../helpers/authenticate';

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
    try {
      const { body } = req.body;
      const questionId = req.params.id;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const createdBy = decodedToken.id;

      const comment = await Comment.create({ createdBy, questionId, body });
      const { rows } = comment;
      if (rows) {
        return res.status(201).send({
          status: 201,
          data: rows,
          message: 'comment was created',
        });
      }
      return res.status(204).send({
        status: 204,
        message: 'comment not created',
      });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error ' });
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
    try {
      const { id } = req.params;
      const question = await Question.getById(id);
      if (question.rows.length > 0) {
        const comment = await Comment.getAll(id);
        const { rows } = comment;
        if (rows.length > 0) {
          return res.status(200).send({
            status: 200,
            data: rows,
            message: 'All comment was retrieved successfully',
          });
        }
        return res.send({ status: 204, error: 'no comment for this question yet' });
      }
      return res.status(404).send({ status: 404, error: 'There is no comment for that id' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }
}

export default CommentController;
