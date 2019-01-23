
import express from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares';

const userRoute = express.Router();

userRoute.post('/signup', Middleware.validateUserSignup, userController.signUp);

userRoute.post('/login', Middleware.validateUserSignin, userController.signIn);


export default userRoute;
