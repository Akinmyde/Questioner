import express from 'express';
import meetupRoute from './meetupRoute';
import questionRoute from './questionRoute';
import userRoute from './userRoute';
import commentRoute from './commentRoute';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to my questioner app endpoint');
});

router.use('/meetups', meetupRoute);

router.use('/questions', questionRoute);

router.use('/auth', userRoute);

router.use('/', commentRoute);

export default router;
