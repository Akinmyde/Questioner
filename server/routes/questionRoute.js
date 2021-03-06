import express from 'express';
import questionController from '../controllers/questionController';
import Middleware from '../middlewares';

const questionRoute = express.Router();

questionRoute.post('/', Middleware.isLogin, Middleware.createQuestionValidator, questionController.createQuestion);

questionRoute.get('/', Middleware.isLogin, questionController.getAllQuestion);

questionRoute.get('/user', Middleware.isLogin, questionController.getQuestionByUserId);

questionRoute.get('/:id', Middleware.isLogin, Middleware.validateParams, questionController.QuestionById);


questionRoute.patch('/:id/upvote', Middleware.isLogin, Middleware.validateParams, questionController.upVote);

questionRoute.patch('/:id/downvote', Middleware.isLogin, Middleware.validateParams, questionController.downVoteQuestion);


export default questionRoute;
