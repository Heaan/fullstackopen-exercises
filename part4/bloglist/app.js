const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

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

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
