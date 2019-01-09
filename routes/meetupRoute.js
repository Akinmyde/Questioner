import express from 'express';
import meetupController from '../controllers/meetupController';
import Middleware from '../middlewares/index.middleswares';

const meetupRouter = express.Router();


meetupRouter.post('/api/v1/meetups', Middleware.createMeetupValidator, meetupController.createMeetup);

meetupRouter.get('/api/v1/meetups', meetupController.getAllMeetup);

meetupRouter.get('/api/v1/meetups/upcoming', meetupController.getUpcomingMeetupus);

meetupRouter.delete('/api/v1/meetups/:id', Middleware.validateParams, meetupController.deleteMeetup);

meetupRouter.get('/api/v1/meetups/:id', Middleware.validateParams, meetupController.getMeetupById);

meetupRouter.get('/api/v1/meetups/:id/questions', Middleware.validateParams, meetupController.getMeetupQuestions);

meetupRouter.post('/api/v1/meetups/:id/rsvps', Middleware.validateParams, meetupController.rsvpsMeetup);

export default meetupRouter;
