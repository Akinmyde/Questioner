const express = require('express');
const controller = require('../controllers/index.controller');

const router = express.Router();

router.route('/api/v1/meetups')
  .post(controller.createMeetup)
  .get(controller.getAllMeetup);

router.route('/api/v1/meetups/:id')
  .get(controller.getMeetupById);

module.exports = router;
