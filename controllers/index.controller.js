const db = require('../db/meetups');

const createMeetup = (req, res) => {
  if (!req.body.topic) {
    return res.send({
      status: 400,
      error: 'topic is required',
    });
  }
  if (!req.body.location) {
    return res.send({
      status: 400,
      error: 'location is required',
    });
  }
  if (!req.body.happeningOn) {
    return res.send({
      status: 400,
      error: 'happeningOn is required',
    });
  }
  const newMeetup = {
    id: db.length + 1,
    createdOn: Date.now(),
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    images: req.body.images || null,
    tags: req.body.tags || null,
  };
  db.push(newMeetup);
  return res.status(201).send({
    status: 201,
    data: newMeetup,
  });
};

module.exports = { createMeetup };
