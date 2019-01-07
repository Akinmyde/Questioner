import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater, findArrayById } = helpers;

class QuestionController {
  static createQuestion(req, res) {
    const id = db.questions.length + 1;
    const createdOn = dateFormater();
    const votes = 0;
    const { title, body } = req.body;
    const newQuestion = {
      id, createdOn, createdBy: db.users[0].id, meetup: db.meetups[0].id, title, body, votes,
    };
    const findQuestion = db.questions
      .find(question => question.title.toLowerCase() === title.toLowerCase());
    if (!findQuestion) {
      db.questions.push(newQuestion);
      return res.status(201).send({
        status: 201,
        data: [newQuestion],
      });
    }
    return res.status(400).send({ status: 400, error: 'question not created' });
  }

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

  static upVoteQuestion(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    findArrayById(db.questions, id);
    if (questionFound) {
      questionFound.votes += 1;
      questionFound.upvote += 1;
      return res.status(200).send({
        status: 204,
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

  static downVoteQuestion(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    if (questionFound) {
      questionFound.votes -= 1;
      questionFound.downvote += 1;
      return res.status(200).send({
        status: 204,
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
