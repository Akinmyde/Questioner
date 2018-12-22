const { question, meetup } = require('../db/index.db');

const createMeetup = (req, res) => {
  const newMeetup = {
    id: meetup.length + 1,
    createdOn: Date.now(),
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    images: req.body.images || null,
    tags: req.body.tags || null,
  };
  if (newMeetup.topic && newMeetup.location && newMeetup.happeningOn) {
    meetup.push(newMeetup);
    return res.status(201).send({
      status: 201,
      data: [newMeetup],
    });
  }
  return res.status(400).send({ error: 'meetup not created' });
};

const getAllMeetup = (req, res) => {
  if (question.length > 0) {
    return res.status(200).send({
      status: 200,
      data: meetup,
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'Nothing found',
  });
};

const getMeetupById = (req, res) => {
  const { id } = req.params;
  const find = meetup.find(x => x.id.toString() === id);
  if (find) {
    return res.status(200).send({
      status: 200,
      data: [find],
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'meetup not found',
  });
};

const createQuestion = (req, res) => {
  const newQuestion = {
    id: question.length + 1,
    createdOn: Date,
    createdBy: 2,
    meetup: 2,
    title: req.body.title,
    body: req.body.body,
    vote: 0,
  };
  if (newQuestion.title && newQuestion.body) {
    question.push(newQuestion);
    return res.status(201).send({
      status: 201,
      data: [newQuestion],
    });
  }
  return res.status(400).send({ error: 'meetup not created' });
};

module.exports = {
  createMeetup, getAllMeetup, getMeetupById, createQuestion,
};
