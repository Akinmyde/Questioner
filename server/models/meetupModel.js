import pool from './connection';
import helpers from '../helpers/index.helpers';

const { regex } = helpers;

class Meetup {
  static async create({
    topic,
    location,
    happeningOn,
  }) {
    try {
      const client = await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO meetups(topic, location, happeningOn) VALUES($1, $2, $3) RETURNING *',
        values: [regex(topic), regex(location), regex(happeningOn)],
      };
      const res = await client.query(insertQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async delete(id) {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'DELETE FROM meetups WHERE id = $1',
        values: [id],
      };
      const res = await client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async getAll() {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM meetups',
      };
      const res = client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async getById(id) {
    try {
      const client = await pool.connect();
      const selectQuery = {
        text: 'SELECT * FROM meetups WHERE ID = $1',
        values: [id],
      };
      const res = client.query(selectQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }

  static async rsvp({
    meetupId, userId, response,
  }) {
    try {
      const meetup = await this.getById(meetupId);
      if (meetup.rowCount === 0) {
        return 'Meetup not found';
      }
      const client = await pool.connect();
      const insertQuery = {
        text: 'INSERT INTO rsvps (meetup, user_id, response) VALUES($1, $2, $3) RETURNING *',
        values: [meetupId, userId, regex(response)],
      };
      const res = await client.query(insertQuery);
      client.release();
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default Meetup;
