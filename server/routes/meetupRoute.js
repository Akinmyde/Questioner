import express from 'express';
import meetupController from '../controllers/meetupController';
import Middleware from '../middlewares';

const meetupRouter = express.Router();


meetupRouter.post('/meetups', Middleware.isLogin, Middleware.createMeetupValidator, meetupController.createMeetup);

meetupRouter.get('/meetups', meetupController.getAllMeetup);

meetupRouter.get('/meetups/upcoming', Middleware.isLogin, meetupController.getUpcomingMeetups);

meetupRouter.delete('/meetups/:id', Middleware.isLogin, Middleware.validateParams, meetupController.deleteMeetup);

meetupRouter.get('/meetups/:id', Middleware.isLogin, Middleware.validateParams, meetupController.getMeetupById);

meetupRouter.post('/meetups/:id/rsvps', Middleware.isLogin, Middleware.validateParams, Middleware.valideateRsvp, meetupController.rsvpsMeetup);

export default meetupRouter;
