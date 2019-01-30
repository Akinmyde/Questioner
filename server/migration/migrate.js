import pool from '../config/connection';

const dropTables = 'DROP TABLE IF EXISTS Users, Meetups, Questions, Comments, Rsvps CASCADE;';

const tableUsers = `CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(355) DEFAULT NULL,
    lastname VARCHAR(355) DEFAULT NULL,
    email VARCHAR(355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(13) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    updateOn TIMESTAMP DEFAULT NULL,
    lastLogin TIMESTAMP DEFAULT NULL,
    isAdmin BOOLEAN DEFAULT false);`;

const tableMeetups = `CREATE TABLE Meetups(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    topic VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    happeningOn DATE NOT NULL,
    images VARCHAR (355)[],
    tags VARCHAR (355)[]
  );`;

const tablesQuestions = `CREATE TABLE Questions(
  id SERIAL PRIMARY KEY,
  createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
  createdby integer REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  meetup integer REFERENCES Meetups(id) ON UPDATE CASCADE ON DELETE CASCADE,
  title VARCHAR (100) NOT NULL,
  body VARCHAR (355) NOT NULL,
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0
);`;

const tableComments = `CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    createdby integer REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    questionid integer REFERENCES Questions(id) ON UPDATE CASCADE ON DELETE CASCADE,
    body VARCHAR (355) NOT NULL);`;

const tableRsvp = `CREATE TABLE Rsvps (
  id SERIAL PRIMARY KEY,
  meetup integer REFERENCES Meetups(id) ON UPDATE CASCADE ON DELETE CASCADE,
  userid integer REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  response VARCHAR (355) NOT NULL
  );`;

const migrate = async () => {
  const client = await pool.connect();
  try {
    await client.query(dropTables);
    await client.query(tableUsers);
    await client.query(tableMeetups);
    await client.query(tablesQuestions);
    await client.query(tableComments);
    await client.query(tableRsvp);
  } catch (err) {
    console.log(err);
  } finally {
    await client.release();
  }
};

migrate();
