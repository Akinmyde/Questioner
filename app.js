const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hey Welcome');
})

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});