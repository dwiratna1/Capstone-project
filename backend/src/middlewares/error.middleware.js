const { sendError } = require('../utils/response');

const notFoundHandler = (req, res) => {
  return sendError(res, {
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const payload = {
    statusCode,
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.errors = {
      stack: err.stack,
    };
  }

  return sendError(res, payload);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
