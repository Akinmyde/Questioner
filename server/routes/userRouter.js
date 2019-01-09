
import express from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares/index.middleswares';

const userRoute = express.Router();

userRoute.post('/api/v1/auth/sign-up', Middleware.validateUserSignup, userController.signUp);

userRoute.post('/api/v1/auth/sign-in', Middleware.validateUserSignin, userController.signIn);


export default userRoute;
