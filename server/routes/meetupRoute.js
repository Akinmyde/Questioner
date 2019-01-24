import express from 'express';
import meetupController from '../controllers/meetupController';
import questionController from '../controllers/questionController';
import Middleware from '../middlewares';
import { cloudinaryUpload } from '../config/cloudinary';

const meetupRouter = express.Router();


meetupRouter.post('/', Middleware.isLogin, Middleware.createMeetupValidator, meetupController.createMeetup);

meetupRouter.get('/', meetupController.getAllMeetup);

meetupRouter.get('/upcoming', Middleware.isLogin, meetupController.getUpcomingMeetups);

meetupRouter.delete('/:id', Middleware.isLogin, Middleware.validateParams, meetupController.deleteMeetup);

meetupRouter.get('/:id', Middleware.isLogin, Middleware.validateParams, meetupController.getMeetupById);

meetupRouter.post('/:id/rsvps', Middleware.isLogin, Middleware.validateParams, Middleware.valideateRsvp, meetupController.rsvpsMeetup);

meetupRouter.get('/:id/questions', Middleware.isLogin, Middleware.validateParams, questionController.getQuestionByMeetup);

meetupRouter.post('/:id/tags', Middleware.isLogin, Middleware.validateParams, Middleware.isArray, meetupController.meetupTags);

meetupRouter.post('/:id/images', Middleware.isLogin, Middleware.validateParams, cloudinaryUpload.array('images', 10), Middleware.validateImage, meetupController.meetupImage);

export default meetupRouter;
