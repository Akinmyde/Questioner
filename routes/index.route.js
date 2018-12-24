const express = require('express');
const controller = require('../controllers/index.controller');

const router = express.Router();

router.route('/api/v1/meetups')
  .post(controller.createMeetup)
  .get(controller.getAllMeetup);

router.route('/api/v1/meetups/:id')
  .get(controller.getMeetupById);

router.route('/api/v1/questions')
  .post(controller.createQuestion);

router.route('/api/v1/questions/:id')
  .get(controller.getQuestionById);

router.route('/api/v1/questions/:id/upvote')
  .patch(controller.upVote);

router.route('/api/v1/questions/:id/downvote')
  .patch(controller.downVote);

router.route('/api/v1/meetups/:id/rsvps')
  .post(controller.rsvps);

router.route('/api/v1/auth/sign-up')
  .post(controller.signUp);


module.exports = router;
