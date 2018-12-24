import express from 'express';
import meetupController from '../controllers/meetupController';
import userController from '../controllers/userController';
import Middleware from '../middlewares/index.middleswares';

const router = express.Router();

router.post('/api/v1/meetups', Middleware.createMeetupValidator, meetupController.createMeetup);

router.get('/api/v1/meetups', meetupController.getAllMeetup);

router.get('/api/v1/meetups/:id', Middleware.validateParams, meetupController.getMeetupById);

router.post('/api/v1/questions', Middleware.createQuestionController, meetupController.createQuestion);

router.get('/api/v1/questions/:id', Middleware.validateParams, meetupController.getQuestionById);

router.patch('/api/v1/questions/:id/upvote', Middleware.validateParams, meetupController.upVote);

router.patch('/api/v1/questions/:id/downvote', Middleware.validateParams, meetupController.downVote);

router.post('/api/v1/meetups/:id/rsvps', Middleware.validateParams, meetupController.rsvps);

router.post('/api/v1/auth/sign-up', Middleware.validateUserSignup, userController.signUp);

router.post('/api/v1/auth/sign-in', Middleware.validateUserSignin, userController.signIn);

export default router;
