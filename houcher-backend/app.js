const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const userRouter = require('./controllers/user');
const apartmentsRouter = require('./controllers/apartments');
const staticRouter = require('./controllers/static');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.logInfo('connecting to ', config.MONGO_URI, '...');
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.logInfo('Connected to MongoDB');
  })
  .catch((err) => {
    logger.errorInfo('Error in connecting to MongoDB: ', err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/user', userRouter);
app.use('/api/apartments', apartmentsRouter);
// Fix the issue with refresh and React routes in build version
app.use('/*', staticRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
