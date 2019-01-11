import express from 'express';
import questionController from '../controllers/questionController';
import Middleware from '../middlewares/index.middleswares';
import commentControllers from '../controllers/commentController';

const questionRoute = express.Router();

questionRoute.post('/api/v1/questions', Middleware.createQuestionValidator, questionController.createQuestion);

questionRoute.get('/api/v1/questions/:id', Middleware.validateParams, questionController.getQuestionById);

questionRoute.post('/api/v1/questions/:id/comments', Middleware.validateParams, Middleware.addCommentValidator, commentControllers.Addcomment);

questionRoute.get('/api/v1/questions/:id/comments', commentControllers.getAllComment);

questionRoute.patch('/api/v1/questions/:id/upvote', Middleware.validateParams, questionController.upVoteQuestion);

questionRoute.patch('/api/v1/questions/:id/downvote', Middleware.validateParams, questionController.downVoteQuestion);


export default questionRoute;
