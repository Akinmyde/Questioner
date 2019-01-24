import authentication from '../helpers/authenticate';
import pool from '../config/connection';
import helpers from '../helpers/helpers';

const { regex } = helpers;

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
    const client = await pool.connect();
    try {
      const { topic, location, happeningOn } = req.body;
      const token = req.body.token || req.headers.token;
      const decodedToken = await decode(token);
      const { isAdmin } = decodedToken;

      if (isAdmin) {
        const createMeetupQuery = {
          text: 'INSERT INTO meetups(topic, location, happeningOn) VALUES($1, $2, $3) RETURNING *',
          values: [regex(topic), regex(location), happeningOn],
        };
        const meetup = await client.query(createMeetupQuery);
        const { rows } = meetup;

        if (rows) {
          return res.status(201).send({ status: 201, data: [rows[0]], message: 'Meetup was created successfully' });
        }
        return res.status(204).send({ status: 204, error: 'Meetup not created' });
      }
      return res.status(401).send({ status: 401, error: 'Only an admin can create a meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
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
    const client = await pool.connect();
    try {
      const { token } = req.headers;
      const decodedToken = await decode(token);

      const { isAdmin } = decodedToken;

      if (isAdmin) {
        const { id } = req.params;
        const deleteMeetupQuery = {
          text: 'DELETE FROM meetups WHERE id = $1',
          values: [id],
        };
        const meetup = await client.query(deleteMeetupQuery);
        const { rowCount } = meetup;
        if (rowCount === 1) {
          return res.status(200).send({ status: 200, data: [], message: 'Meetup was deleted successfully' });
        }
        return res.status(404).send({ status: 404, error: 'Meetup not found' });
      }
      return res.status(401).send({ status: 401, error: 'Only an admin can delete a meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
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
    const client = await pool.connect();
    try {
      const getAllMeetupQuery = {
        text: 'SELECT * FROM meetups',
      };
      const meetups = await client.query(getAllMeetupQuery);
      const { rows } = meetups;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'All meetups was retrieved successfully' });
      }
      return res.send({ status: 204, data: [], message: 'no meetup yet' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
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
    const client = await pool.connect();
    try {
      const { id } = req.params;
      const getByIdQuery = {
        text: 'SELECT * FROM meetups WHERE ID = $1',
        values: [id],
      };
      const meetup = await client.query(getByIdQuery);
      const { rows } = meetup;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'Meetup was retrieved' });
      }
      return res.send({ status: 204, message: 'meetup not found' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
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
    const client = await pool.connect();
    try {
      const upcomingMeetupQuery = {
        text: 'SELECT * FROM meetups WHERE happeningon > NOW()',
      };
      const upcomingMeetups = await client.query(upcomingMeetupQuery);

      const { rows } = upcomingMeetups;
      if (rows.length > 0) {
        return res.status(200).send({ status: 200, data: rows, message: 'Upcoming meetups retrieved' });
      }
      return res.status(204).send({ status: 204, error: 'no upcoming meetups' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  /**
 * @description - this method respond to meetup RSVP
 *
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 *
 * @returns {object} - status message and response
 */
  static async rsvpsMeetup(req, res) {
    const client = await pool.connect();
    try {
      const meetupId = req.params.id;
      const meetupQuery = { text: 'SELECT FROM meetups WHERE id = $1', values: [meetupId] };
      const meetup = await client.query(meetupQuery);
      if (meetup.rowCount === 0) {
        return res.status(404).send({ status: 404, error: 'Meetup not found' });
      }
      const token = req.headers.token || req.body.token;
      const decodedToken = await decode(token);
      const userId = decodedToken.id;
      const userResponseQuery = {
        text: 'SELECT FROM rsvps WHERE meetup = $1 AND userid = $2',
        values: [meetupId, userId],
      };
      const userResponse = await client.query(userResponseQuery);
      if (userResponse.rowCount === 1) {
        return res.status(409).send({ status: 409, error: 'You have already responded to this meetup' });
      }
      const { response } = req.body;
      const rsvpQuery = {
        text: 'INSERT INTO rsvps (meetup, userid, response) VALUES($1, $2, $3) RETURNING *',
        values: [meetupId, userId, regex(response)],
      };
      const rsvp = await client.query(rsvpQuery);
      const { rows } = rsvp;
      if (rows) {
        return res.status(201).send({ status: 201, data: [rows[0]], message: 'Your response has been saved' });
      }
      return res.status(204).send({ status: 204, error: 'Response not saved, try again' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }

  static async meetupTags(req, res) {
    const client = await pool.connect();
    try {
      const token = req.headers.token || req.body.token;
      const decodedToken = await decode(token);

      const { isAdmin } = decodedToken;

      if (isAdmin) {
        const { id } = req.params;
        const { tags } = req.body;
        const addTagQuery = {
          text: 'UPDATE meetups SET tags = $1 WHERE id = $2 RETURNING *',
          values: [tags, id],
        };
        const tagsResult = await client.query(addTagQuery);
        const { rowCount, rows } = tagsResult;
        if (rowCount === 1) {
          return res.status(201).send({ status: 201, data: rows, message: 'Tags was added successfully' });
        }
        return res.status(404).send({ status: 404, error: 'Meetup not found' });
      }
      return res.status(401).send({ status: 401, error: 'Only an admin can add tags a meetup' });
    } catch (err) {
      return res.status(500).send({ status: 500, error: 'Internal server error' });
    } finally {
      await client.release();
    }
  }
}

export default MeetupController;
