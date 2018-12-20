const express = require('express');
const controller = require('../controllers/index.controller');

const router = express.Router();

router.route('/api/v1/meetups')
  .post(controller.createMeetup);

module.exports = router;
