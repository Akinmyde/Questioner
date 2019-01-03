import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater, findArrayById } = helpers;

class MeetupController {
  static createMeetup(req, res) {
    const id = db.meetups.length + 1;
    const createdOn = dateFormater();
    const {
      topic, location, happeningOn, tags,
    } = req.body;
    const newMeetup = {
      id, createdOn, topic, location, happeningOn, tags,
    };
    const findTopic = db.meetups.find(meetup => meetup.topic === newMeetup.topic);
    if (!findTopic) {
      db.meetups.push(newMeetup);
      return res.status(201).send({
        status: 201,
        data: [newMeetup],
      });
    }
    return res.status(400).send({ status: 400, error: 'not created' });
  }

  static getAllMeetup(req, res) {
    return res.status(200).send({
      status: 200,
      data: db.meetups,
    });
  }

  static getMeetupById(req, res) {
    const { id } = req.params;
    const meetupFound = findArrayById(db.meetups, id);
    if (meetupFound) {
      return res.status(200).send({ status: 200, data: [meetupFound] });
    }
    return res.status(404).send({ status: 404, error: 'meetup not found' });
  }

  static getUpcomingMeetupus(req, res) {
    const today = Date.now();
    const upcomingMeetups = [];

    db.meetups.forEach((meetup) => {
      const happeningOnDate = new Date(meetup.happeningOn);
      if (happeningOnDate.getTime() > today) {
        upcomingMeetups.push(meetup);
      }
      return upcomingMeetups;
    });

    if (upcomingMeetups.length > 0) {
      return res.status(200).send({ status: 200, data: upcomingMeetups });
    }
    return res.status(404).send({ status: 404, error: 'no upcoming meetups' });
  }

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

  static upVote(req, res) {
    const { id } = req.params;
    const questionFound = findArrayById(db.questions, id);
    findArrayById(db.questions, id);
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
    const questionFound = findArrayById(db.questions, id);
    if (questionFound) {
      if (questionFound.votes > 0) {
        questionFound.votes -= 1;
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
    const { id } = req.params;
    const meetupFound = findArrayById(db.meetups, id);
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
}

export default MeetupController;
