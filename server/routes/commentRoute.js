import express from 'express';
import Middleware from '../middlewares';
import commentControllers from '../controllers/commentController';

const commentRoute = express.Router();

commentRoute.post('/questions/:id/comments', Middleware.isLogin, Middleware.validateParams, Middleware.addCommentValidator, commentControllers.addComment);

commentRoute.get('/comments', Middleware.isLogin, commentControllers.AllComment);

commentRoute.get('/comments/user', Middleware.isLogin, commentControllers.getUsersComments);

commentRoute.get('/questions/:id/comments', Middleware.isLogin, Middleware.validateParams, commentControllers.getCommentByQuestion);

export default commentRoute;
