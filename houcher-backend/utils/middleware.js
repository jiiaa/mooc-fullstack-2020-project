const logger = require('./logger');

const requestLogger = (req, res, next) => {
  let d = new Date();
  let options = { hour12: false };
  let date = d.toLocaleString('fi-FI', options);

  logger.logInfo(`${req.method}@${req.path} at ${date}`);
  logger.logInfo('Body if any: ', req.body);
  logger.logInfo('------');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.errorInfo(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Bad format of ID' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = (authorization.substring(7));
  } else {
    req.token = null;
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
