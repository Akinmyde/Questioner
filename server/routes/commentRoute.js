import express from 'express';
import Middleware from '../middlewares';
import commentControllers from '../controllers/commentController';

const commentRoute = express.Router();

commentRoute.post('/:id/comments', Middleware.isLogin, Middleware.validateParams, Middleware.addCommentValidator, commentControllers.addComment);

commentRoute.get('/:id/comments', Middleware.isLogin, Middleware.validateParams, commentControllers.getAllComment);

export default commentRoute;
