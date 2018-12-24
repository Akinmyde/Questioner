import express from 'express';
import meetupController from '../controllers/meetupController';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/api/v1/meetups', meetupController.createMeetup);

router.get('/api/v1/meetups', meetupController.getAllMeetup);

router.get('/api/v1/meetups/:id', meetupController.getMeetupById);

router.post('/api/v1/questions', meetupController.createQuestion);

router.get('/api/v1/questions/:id', meetupController.getQuestionById);

router.patch('/api/v1/questions/:id/upvote', meetupController.upVote);

router.patch('/api/v1/questions/:id/downvote', meetupController.downVote);

router.post('/api/v1/meetups/:id/rsvps', meetupController.rsvps);

router.post('/api/v1/auth/sign-up', userController.signUp);

router.post('/api/v1/auth/sign-in', userController.signIn);

export default router;
