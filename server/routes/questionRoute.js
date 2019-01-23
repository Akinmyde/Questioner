import express from 'express';
import questionController from '../controllers/questionController';
import Middleware from '../middlewares';

const questionRoute = express.Router();

questionRoute.post('/questions', Middleware.isLogin, Middleware.createQuestionValidator, questionController.createQuestion);

questionRoute.get('/questions/:id', Middleware.isLogin, Middleware.validateParams, questionController.getQuestionById);

questionRoute.get('/meetups/:id/questions', Middleware.isLogin, Middleware.validateParams, questionController.getQuestionByMeetup);

questionRoute.patch('/questions/:id/upvote', Middleware.isLogin, Middleware.validateParams, questionController.upVoteQuestion);

questionRoute.patch('/questions/:id/downvote', Middleware.isLogin, Middleware.validateParams, questionController.downVoteQuestion);


export default questionRoute;
