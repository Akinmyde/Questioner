// import pool from './connection';
// import helpers from '../helpers/index.helpers';

// const { regex } = helpers;

// class Comment {
//   static async create({
//     createdOn,
//     body,
//   }) {
//     try {
//       const client = await pool.connect();
//       const insertQuery = {
//         text: 'INSERT INTO comments(topic, location, happeningOn) VALUES($1, $2, $3) RETURNING *',
//         values: [regex(topic), regex(location), regex(happeningOn)],
//       };
//       const res = await client.query(insertQuery);
//       client.release();
//       return res;
//     } catch (err) {
//       return err;
//     }
//   }
// }
