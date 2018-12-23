const {
  question, meetup, Rsvp, User,
} = require('../db/index.db');

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

const upVote = (req, res) => {
  const { id } = req.params;
  const find = question.find(x => x.id.toString() === id);
  if (find) {
    find.vote += 1;
    return res.status(200).send({
      status: 204,
      data: [
        {
          meetup: find.meetup,
          title: find.title,
          body: find.body,
          votes: find.vote,
        },
      ],
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'question not found',
  });
};

const downVote = (req, res) => {
  const { id } = req.params;
  const find = question.find(x => x.id.toString() === id);
  if (find) {
    if (find.vote > 0) {
      find.vote -= 1;
    } else {
      find.vote = 0;
    }
    return res.status(200).send({
      status: 204,
      data: [
        {
          meetup: find.meetup,
          title: find.title,
          body: find.body,
          votes: find.vote,
        },
      ],
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'question not found',
  });
};

const rsvps = (req, res) => {
  const find = meetup.find(x => x.id.toString() === req.params.id);
  if (find) {
    const { response } = req.body;
    if (response === 'yes' || response === 'no' || response === 'maybe') {
      const rsvp = {
        id: Rsvp.length + 1, meetup: find.id, user: User[0].id, response,
      };
      Rsvp.push(rsvp);
      return res.status(201).send({
        status: 201,
        data: [{ meetup: find.id, topic: find.topic, status: response }],
      });
    }
    return res.status(400).send({
      status: 400,
      error: 'not created',
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'meetup not found',
  });
};

module.exports = {
  createMeetup, getAllMeetup, getMeetupById, createQuestion, upVote, downVote, rsvps,
};
