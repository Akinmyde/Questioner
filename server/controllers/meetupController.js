import Meetup from '../models/meetupModel';
import authentication from '../helpers/authenticate';

const { decode } = authentication;

/* This class contains the logic for Meetups */
class MeetupController {
  /**
 * @description - this method create a meetup
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async createMeetup(req, res) {
    try {
      const { topic, location, happeningOn } = req.body;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const { isAdmin } = decodedToken;
      if (isAdmin) {
        const meetup = await Meetup.create({
          topic, location, happeningOn,
        });
        const { rows, constraint } = meetup;

        if (rows) {
          return res.status(201).send({ status: 201, data: [rows[0]], message: 'Meetup was created successfully' });
        }
        if (constraint === 'meetups_topic_key') {
          return res.status(409).send({ status: 409, error: 'Meetup already exists' });
        }
      }
      return res.status(401).send({ status: 401, error: 'Only an admin can create a meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error occur' });
    }
  }

  /**
 * @description - this method delete a meetup
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async deleteMeetup(req, res) {
    try {
      const { token } = req.headers;
      const decodedToken = await decode(token);

      const { isAdmin } = decodedToken;
      if (isAdmin) {
        const { id } = req.params;
        const meetup = await Meetup.delete(id);
        const { rowCount } = meetup;
        if (rowCount === 1) {
          return res.status(200).send({ status: 200, data: [], message: 'Meetup was deleted successfully' });
        }
        return res.status(404).send({ status: 404, error: 'Meetup not found' });
      }
      return res.status(404).send({ status: 404, error: 'Only an admin can delete a meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }

  /**
 * @description - this method get all meetup
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async getAllMeetup(req, res) {
    try {
      const meetups = await Meetup.getAll();
      const { rows } = meetups;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'All meetups was retrieved successfully',
        });
      }
      return res.status(404).send({ status: 404, error: 'no meetup yet' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }

  /**
 * @description - this method get a meetup by it's id
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async getMeetupById(req, res) {
    try {
      const { id } = req.params;
      const meetup = await Meetup.getById(id);

      const { rows } = meetup;
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          data: rows,
          message: 'Meetup was retrieved',
        });
      }
      return res.status(404).send({ status: 404, error: 'meetup not found' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }

  /**
 * @description - this method get all upcoming meetups
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async getUpcomingMeetups(req, res) {
    try {
      const meetups = await Meetup.getAll();
      const today = new Date().getTime();
      const upcomingMeetups = [];

      meetups.rows.forEach((meetup) => {
        const happeningOnDate = new Date(meetup.happeningon);
        if (happeningOnDate.getTime() > today) {
          upcomingMeetups.push(meetup);
        }
        return upcomingMeetups;
      });
      if (upcomingMeetups.length > 0) {
        return res.status(200).send({ status: 200, data: upcomingMeetups, message: 'Upcoming meetups retrieved' });
      }
      return res.status(404).send({ status: 404, error: 'no upcoming meetups' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }

  /**
 * @description - this method get a question for a meetup
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  // static getMeetupQuestions(req, res) {
  //   const { id } = req.params;
  //   const questionFound = db.questions.filter(question => question.meetup.toString() === id);
  //   if (questionFound.length > 0) {
  //     return res.status(200).send({ status: 200, data: [questionFound] });
  //   }
  //   return res.status(404).send({ status: 404, error: 'questions not found for this meetup' });
  // }

  /**
 * @description - this method respond to meetup RSVP
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async rsvpsMeetup(req, res) {
    try {
      const meetupId = req.params.id;
      const token = req.headers.token || req.body.token;
      const decodedToken = await decode(token);
      const userId = decodedToken.id;
      const { response } = req.body;

      const rsvp = await Meetup.rsvp({ meetupId, userId, response });
      const { rows } = rsvp;

      if (rows) {
        return res.status(201).send({ status: 201, data: [rows[0]], message: 'Your response has been saved' });
      }
      return res.status(404).send({
        status: 404,
        error: rsvp,
      });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    }
  }
}

export default MeetupController;
