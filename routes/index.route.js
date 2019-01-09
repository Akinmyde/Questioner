import express from 'express';
import meetupRouter from './meetupRoute';
import questionRouter from './questionRoute';
import userRoute from './userRouter';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to my questioner app endpoint');
});

router.use(meetupRouter);

router.use(questionRouter);

router.use(userRoute);

router.all('*', (req, res) => {
  res.status(404).send({ status: 404, error: 'Sorry, the page you tried cannot be found' });
});

export default router;
