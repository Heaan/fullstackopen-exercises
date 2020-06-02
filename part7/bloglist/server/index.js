const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const routes = require('@util/routes');
const logger = require('@util/logger');
const config = require('@util/config');
const middleware = require('@middleware/middleware');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

logger.info('connecting to MongoDB');
mongoose
  .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((err) => {
    logger.info('error connection to MongoDB', err.message);
  });

app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(routes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
