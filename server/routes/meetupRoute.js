import express from 'express';
import meetupController from '../controllers/meetupController';
import Middleware from '../middlewares/index.middleswares';

const meetupRouter = express.Router();


meetupRouter.post('/api/v1/meetups', Middleware.isLogin, Middleware.createMeetupValidator, meetupController.createMeetup);

meetupRouter.get('/api/v1/meetups', Middleware.isLogin, meetupController.getAllMeetup);

meetupRouter.get('/api/v1/meetups/upcoming', Middleware.isLogin, meetupController.getUpcomingMeetups);

meetupRouter.delete('/api/v1/meetups/:id', Middleware.isLogin, Middleware.validateParams, meetupController.deleteMeetup);

meetupRouter.get('/api/v1/meetups/:id', Middleware.isLogin, Middleware.validateParams, meetupController.getMeetupById);

// meetupRouter.get('/api/v1/meetups/:id/questions', Middleware.validateParams, meetupController.getMeetupQuestions);

meetupRouter.post('/api/v1/meetups/:id/rsvps', Middleware.isLogin, Middleware.validateParams, Middleware.valideateRsvp, meetupController.rsvpsMeetup);

export default meetupRouter;
