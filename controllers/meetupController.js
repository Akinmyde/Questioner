import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater, findArrayById, regex } = helpers;

class MeetupController {
  static createMeetup(req, res) {
    const id = db.meetups.length + 1;
    const createdOn = dateFormater();
    const {
      topic, location, happeningOn, tags,
    } = req.body;
    const newMeetup = {
      id,
      createdOn,
      topic: regex(topic),
      location: regex(location),
      happeningOn,
      tags,
    };
    const findTopic = db.meetups.find(meetup => meetup.topic === newMeetup.topic);
    if (!findTopic) {
      db.meetups.push(newMeetup);
      return res.status(201).send({
        status: 201,
        data: [newMeetup],
      });
    }
    return res.status(400).send({ status: 400, error: 'meetup already created' });
  }

  static deleteMeetup(req, res) {
    const { id } = req.params;
    const meetupFound = findArrayById(db.meetups, id);
    if (meetupFound) {
      const deletedMeetup = db.meetups.filter(meetup => meetup !== meetupFound);
      db.meetups = deletedMeetup;
      return res.status(200).send({ status: 200, message: 'Meetup was deleted successfully' });
    }
    return res.status(404).send({ status: 404, error: 'meetup not found' });
  }

  static getAllMeetup(req, res) {
    if (db.meetups.length > 0) {
      return res.status(200).send({
        status: 200,
        data: db.meetups,
      });
    }
    return res.status(404).send({ status: 404, error: 'no meetup yet' });
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

  static getMeetupQuestions(req, res) {
    const { id } = req.params;
    const questionFound = db.questions.filter(question => question.meetup.toString() === id);
    if (questionFound.length > 0) {
      return res.status(200).send({ status: 200, data: [questionFound] });
    }
    return res.status(404).send({ status: 404, error: 'questions not found for this meetup' });
  }

  static rsvpsMeetup(req, res) {
    const { id } = req.params;
    const meetupFound = findArrayById(db.meetups, id);
    if (meetupFound) {
      const { response } = req.body;
      const formatedResponse = regex(response);
      if (formatedResponse === 'yes' || formatedResponse.trim() === 'no' || formatedResponse.trim() === 'maybe') {
        const rsvp = {
          id: db.rsvps.length + 1, meetup: db.rsvps.id, user: db.users[0].id, formatedResponse,
        };
        db.rsvps.push(rsvp);
        return res.status(201).send({
          status: 201,
          data: [{ meetup: meetupFound.id, topic: meetupFound.topic, status: formatedResponse }],
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
}

export default MeetupController;
