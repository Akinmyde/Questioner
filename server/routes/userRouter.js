
import express from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares';

const userRoute = express.Router();

userRoute.post('/auth/signup', Middleware.validateUserSignup, userController.signUp);

userRoute.post('/auth/login', Middleware.validateUserSignin, userController.signIn);


export default userRoute;
