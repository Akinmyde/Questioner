const db = require('../models/index.models');
const Middleware = require('../middlewares/index.middlewares');

class MeetupController {
  static createMeetup(req, res) {
    const newMeetup = {
      id: db.meetups.length + 1,
      createdOn: Middleware.dateFormater(),
      topic: req.body.topic,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      images: req.body.images || null,
      tags: req.body.tags || null,
    };
    if (newMeetup.topic && newMeetup.location && newMeetup.happeningOn) {
      db.meetups.push(newMeetup);
      return res.status(201).send({
        status: 201,
        data: [newMeetup],
      });
    }
    return res.status(400).send({ error: 'meetup not created' });
  }

  static getAllMeetup(req, res) {
    if (db.meetups.length > 0) {
      return res.status(200).send({
        status: 200,
        data: db.meetups,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'Nothing found',
    });
  }

  static getMeetupById(req, res) {
    const { id } = req.params;
    const meetupFound = db.meetups.find(x => x.id.toString() === id);
    if (meetupFound) {
      return res.status(200).send({
        status: 200,
        data: [meetupFound],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'meetup not found',
    });
  }

  static createQuestion(req, res) {
    const newQuestion = {
      id: db.questions.length + 1,
      createdOn: Middleware.dateFormater(),
      createdBy: db.users[0].id,
      meetup: db.meetups[0].id,
      title: req.body.title,
      body: req.body.body,
      votes: 0,
    };
    if (newQuestion.title && newQuestion.body) {
      db.questions.push(newQuestion);
      return res.status(201).send({
        status: 201,
        data: [newQuestion],
      });
    }
    return res.status(400).send({ error: 'meetup not created' });
  }

  static upVote(req, res) {
    const { id } = req.params;
    const questionFound = db.questions.find(x => x.id.toString() === id);
    if (questionFound) {
      questionFound.votes += 1;
      return res.status(200).send({
        status: 204,
        data: [
          {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: questionFound.votes,
          },
        ],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }

  static downVote(req, res) {
    const { id } = req.params;
    const questionFound = db.questions.find(x => x.id.toString() === id);
    if (questionFound) {
      if (questionFound.votes > 0) {
        questionFound.votes -= 1;
      } else {
        questionFound.vote = 0;
      }
      return res.status(200).send({
        status: 204,
        data: [
          {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: questionFound.votes,
          },
        ],
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'question not found',
    });
  }

  static rsvps(req, res) {
    const meetupFound = db.meetups.find(x => x.id.toString() === req.params.id);
    if (meetupFound) {
      const { response } = req.body;
      if (response === 'yes' || response === 'no' || response === 'maybe') {
        const rsvp = {
          id: db.rsvps.length + 1, meetup: db.rsvps.id, user: db.users[0].id, response,
        };
        db.rsvps.push(rsvp);
        return res.status(201).send({
          status: 201,
          data: [{ meetup: meetupFound.id, topic: meetupFound.topic, status: response }],
        });
      }
      return res.status(400).send({
        status: 400,
        error: 'not created',
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'meetup not found',
    });
  }

  static getQuestionById(req, res) {
    const questionFound = db.questions.find(x => x.id.toString() === req.params.id);
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
}

module.exports = MeetupController;
