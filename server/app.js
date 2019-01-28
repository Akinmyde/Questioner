import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import cors from 'cors';

import router from './routes/index';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.all('*', (req, res) => {
  res.status(404).send({ status: 404, error: 'Sorry, the page you tried cannot be found' });
});

app.listen(port, () => {
  console.log(`listening on port ${chalk.blue(port)}`);
});

export default app;
