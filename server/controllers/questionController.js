import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater, findArrayById, regex } = helpers;

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
  static createQuestion(req, res) {
    const id = db.questions.length + 1;
    const createdOn = dateFormater();
    const { title, body } = req.body;
    const newQuestion = {
      id,
      createdOn,
      user: db.users[0].id,
      meetup: db.meetups[0].id,
      title: regex(title),
      body: body.trim(),
    };
    const findQuestion = db.questions
      .find(question => question.title.toLowerCase() === newQuestion.title.toLowerCase());
    if (!findQuestion) {
      db.questions.push(newQuestion);
      return res.status(201).send({
        status: 201,
        data: [newQuestion],
      });
    }
    return res.status(409).send({ status: 409, error: 'question already created' });
  }

  /**
* @description - this method get a question by it's id
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static getQuestionById(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    if (questionFound) {
      return res.status(200).send({
        status: 200,
        data: [{
          title: questionFound.title,
          body: questionFound.body,
          votes: questionFound.vote,
          createdOn: questionFound.createdOn,
        }],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }

  /**
 * @description - this method upvote a questiom
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static upVoteQuestion(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    findArrayById(db.questions, id);
    if (questionFound) {
      questionFound.votes += 1;
      questionFound.upvote += 1;
      return res.status(200).send({
        status: 200,
        data: [
          {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: questionFound.votes,
            upvotes: questionFound.upvote,
            downvote: questionFound.downvote,
          },
        ],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }

  /**
* @description - this method downvote a questiom
*
* @param {object} req - The request payload sent to the router
* @param {object} res - The response payload sent back from the controller
*
* @returns {object} - status message and response
*/
  static downVoteQuestion(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    if (questionFound) {
      questionFound.votes -= 1;
      questionFound.downvote += 1;
      return res.status(200).send({
        status: 200,
        data: [
          {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: questionFound.votes,
            upvotes: questionFound.upvote,
            downvote: questionFound.downvote,
          },
        ],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }
}

export default QuestionController;
