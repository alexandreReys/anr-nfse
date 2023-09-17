const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const utils = require('./utils');
const { ErrorsMapped } = require('./config/errors-mapped');

import allRouter from './routes/all';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// =============================================================
// ALL ROUTES
// =============================================================
app.use(allRouter);

// =============================================================
// ENDPOINT NOT FOUND
// =============================================================
app.use('*', (_, res, next) => {
  return utils.sendError(ErrorsMapped.RequestNotFound, next);
});

// =============================================================
// ERROR RESPONSE
// =============================================================
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      code: error.code,
      message: error.message,
      errorKey: error.errorKey || 0,
    },
  });
});

module.exports = app;
