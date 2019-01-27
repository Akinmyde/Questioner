
import express from 'express';
import userController from '../controllers/userController';
import Middleware from '../middlewares';

const userRoute = express.Router();

userRoute.post('/signup', Middleware.validateUserSignup, userController.signUp);

userRoute.post('/login', Middleware.validateUserSignin, userController.signIn);

userRoute.put('/profile', Middleware.isLogin, Middleware.validateUserProfile, userController.profile);

userRoute.post('/forget', Middleware.validateForgetPassword, userController.forgetPassword);

userRoute.patch('/reset/:token', Middleware.validateResetPassword, userController.resetPassword);


export default userRoute;
