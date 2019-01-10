import pool from './connection';

const tables = [
  `DROP TABLE IF EXISTS Users CASCADE;
    CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(355),
    lastname VARCHAR(355),
    email VARCHAR(355) UNIQUE NOT NULL,
    phoneNumber VARCHAR(13),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    registered TIMESTAMP NOT NULL,
    updateOn TIMESTAMP,
    lastLogin TIMESTAMP,
    isAdmin BOOLEAN
  );`,
  `DROP TABLE IF EXISTS Meetups CASCADE;
    CREATE TABLE Meetups (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    topic VARCHAR (355) UNIQUE NOT NULL,
    location VARCHAR (355) NOT NULL,
    happeningOn VARCHAR (20) NOT NULL,
    images VARCHAR (355)[],
    tags VARCHAR (355)[]
  );`,
  `DROP TABLE IF EXISTS Questions CASCADE;
    CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL,
    createdBy integer NOT NULL,
    meetup integer NOT NULL,
    title VARCHAR (355) NOT NULL,
    body VARCHAR (355) NOT NULL,
    votes integer NOT NULL,
    CONSTRAINT Meetups_createdBy_fkey FOREIGN KEY (createdBy)
          REFERENCES Users (id) MATCH SIMPLE
          ON UPDATE NO ACTION ON DELETE SET NULL,
    CONSTRAINT Meetups_meetup_fkey FOREIGN KEY (meetup)
          REFERENCES Questions (id) MATCH SIMPLE
          ON UPDATE NO ACTION ON DELETE SET NULL
  );`,
  `DROP TABLE IF EXISTS Rsvps CASCADE;
    CREATE TABLE Rsvps (
    id SERIAL PRIMARY KEY,
    meetup integer NOT NULL,
    user_id integer NOT NULL,
    response VARCHAR (355) NOT NULL,
    CONSTRAINT Rsvps_meetup_fkey FOREIGN KEY (meetup)
          REFERENCES Meetups (id) MATCH SIMPLE
          ON UPDATE NO ACTION ON DELETE SET NULL,
    CONSTRAINT Rsvps_user_id_fkey FOREIGN KEY (user_id)
          REFERENCES Users (id) MATCH SIMPLE
          ON UPDATE NO ACTION ON DELETE SET NULL
    );`,
];

tables.forEach(query => pool.query(query, error => console.log(error)));
