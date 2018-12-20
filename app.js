const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const router = require('./routes/index.route');

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hey Welcome');
});

if (!module.parent) {
  app.listen(port, () => {
    debug(`listening on port ${chalk.blue(port)}`);
  });
}

module.exports = app;
