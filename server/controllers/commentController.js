import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater, findArrayById, regex } = helpers;

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
  static Addcomment(req, res) {
    const questionId = req.params.id;
    const questionFound = findArrayById(db.questions, questionId);
    if (questionFound) {
      const id = db.comments.length + 1;
      const createdOn = dateFormater();
      const { body } = req.body;
      const newComment = {
        id,
        createdBy: db.users[0].id,
        questionId: questionFound.id,
        body: regex(body),
        createdOn,
      };
      db.comments.push(newComment);
      return res.status(201).send({
        status: 201,
        data: [newComment],
      });
    }
    return res.status(400).send({ status: 400, error: 'comment not created' });
  }

  /**
 * @description - this method get all comment
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static getAllComment(req, res) {
    const questionId = req.params.id;
    const questionFound = findArrayById(db.questions, questionId);
    if (questionFound) {
      const commentFound = db.comments.filter(comment => comment
        .questionId.toString() === questionFound.id.toString());
      if (commentFound.length > 0) {
        return res.status(200).send({
          status: 200,
          data: [commentFound],
        });
      }
      return res.status(200).send({ status: 200, error: 'no comment yet' });
    }
    return res.status(404).send({ status: 404, error: 'question not found' });
  }
}

export default CommentController;