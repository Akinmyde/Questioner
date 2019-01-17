import express from 'express';
import questionController from '../controllers/questionController';
import Middleware from '../middlewares/index.middleswares';

const questionRoute = express.Router();

questionRoute.post('/api/v1/meetups/:id/questions', Middleware.isLogin, Middleware.createQuestionValidator, questionController.createQuestion);

questionRoute.get('/api/v1/questions/:id', Middleware.isLogin, Middleware.validateParams, questionController.getQuestionById);

questionRoute.patch('/api/v1/questions/:id/upvote', Middleware.isLogin, Middleware.validateParams, questionController.upVoteQuestion);

questionRoute.patch('/api/v1/questions/:id/downvote', Middleware.isLogin, Middleware.validateParams, questionController.downVoteQuestion);


export default questionRoute;
