import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import router from './routes/index';

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('api/v1/', router);

app.listen(port, () => {
  console.log(`listening on port ${chalk.blue(port)}`);
});

export default app;
