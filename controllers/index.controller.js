const db = require('../db/meetups');

const createMeetup = (req, res) => {
  const newMeetup = {
    id: db.length + 1,
    createdOn: Date.now(),
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    images: req.body.images || null,
    tags: req.body.tags || null,
  };
  if (newMeetup.topic && newMeetup.location && newMeetup.happeningOn) {
    db.push(newMeetup);
    return res.status(201).send({
      status: 201,
      data: newMeetup,
    });
  }
  return res.status(400).send({ error: 'meetup not created' });
};

const getAllMeetup = (req, res) => {
  if (db.length > 0) {
    return res.status(200).send({
      status: 200,
      data: db,
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'Not found',
  });
};

module.exports = { createMeetup, getAllMeetup };
