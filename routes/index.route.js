import express from 'express';
import meetupController from '../controllers/meetupController';
import userController from '../controllers/userController';
import Middleware from '../middlewares/index.middleswares';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to my questioner app endpoint');
});

router.post('/api/v1/meetups', Middleware.createMeetupValidator, meetupController.createMeetup);

router.get('/api/v1/meetups', meetupController.getAllMeetup);

router.get('/api/v1/meetups/upcoming', meetupController.getUpcomingMeetupus);

router.delete('/api/v1/meetups/:id', Middleware.validateParams, meetupController.deleteMeetup);

router.get('/api/v1/meetups/:id', Middleware.validateParams, meetupController.getMeetupById);

router.post('/api/v1/questions', Middleware.createQuestionValidator, meetupController.createQuestion);

router.get('/api/v1/questions/:id', Middleware.validateParams, meetupController.getQuestionById);

router.post('/api/v1/questions/:id/comments', Middleware.validateParams, Middleware.addCommentValidator, meetupController.Addcomment);

router.patch('/api/v1/questions/:id/upvote', Middleware.validateParams, meetupController.upVote);

router.patch('/api/v1/questions/:id/downvote', Middleware.validateParams, meetupController.downVote);

router.post('/api/v1/meetups/:id/rsvps', Middleware.validateParams, meetupController.rsvps);

router.post('/api/v1/auth/sign-up', Middleware.validateUserSignup, userController.signUp);

router.post('/api/v1/auth/sign-in', Middleware.validateUserSignin, userController.signIn);

export default router;
