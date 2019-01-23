import pool from '../config/connection';

const tables = [
  `DROP TABLE IF EXISTS Users;
    CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(355) DEFAULT NULL,
    lastname VARCHAR(355) DEFAULT NULL,
    email VARCHAR(355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(13) DEFAULT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    updateOn TIMESTAMP DEFAULT NULL,
    lastLogin TIMESTAMP DEFAULT CURRENT_DATE,
    isAdmin BOOLEAN
  );`,
  `DROP TABLE IF EXISTS Meetups;
    CREATE TABLE Meetups (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    topic VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    happeningOn DATE NOT NULL,
    images VARCHAR (355)[],
    tags VARCHAR (355)[]
  );`,
  `DROP TABLE IF EXISTS Rsvps;
  CREATE TABLE Rsvps (
  id SERIAL PRIMARY KEY,
  meetup integer NOT NULL,
  userid integer NOT NULL,
  response VARCHAR (355) NOT NULL
  );`,
  `DROP TABLE IF EXISTS Questions;
    CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    createdby integer NOT NULL,
    meetup integer NOT NULL,
    title VARCHAR (100) NOT NULL,
    body VARCHAR (355) NOT NULL,
    upvotes integer DEFAULT 0,
    downvotes integer DEFAULT 0
  );`,
  `DROP TABLE IF EXISTS Comments;
  CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    createdby integer NOT NULL,
    questionid integer NOT NULL,
    body VARCHAR (355) NOT NULL
  )`,
];

tables.forEach(query => pool.query(query));
