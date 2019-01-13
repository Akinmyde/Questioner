
import express from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares/index.middleswares';

const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', Middleware.validateUserSignup, userController.signUp);

userRoute.post('/api/v1/auth/login', Middleware.validateUserSignin, userController.signIn);


export default userRoute;
