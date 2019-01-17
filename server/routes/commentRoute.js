import express from 'express';
import Middleware from '../middlewares';
import commentControllers from '../controllers/commentController';

const commentRoute = express.Router();

commentRoute.post('/api/v1/questions/:id/comments', Middleware.isLogin, Middleware.validateParams, Middleware.addCommentValidator, commentControllers.addComment);

commentRoute.get('/api/v1/questions/:id/comments', Middleware.isLogin, commentControllers.getAllComment);

export default commentRoute;
