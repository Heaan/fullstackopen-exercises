const logger = require('@util/logger');

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('----');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).send({ error: 'malformatted id' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }
  if (
    err.name === 'JsonWebTokenError'
    || err.name === 'TokenExpiredError'
    || err.name === 'NotBeforeError'
  ) {
    res.status(401).json({ error: err.message });
    return;
  }
  next(err);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    req.token = auth.substring(7);
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
