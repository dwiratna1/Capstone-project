const sendSuccess = (res, { statusCode = 200, message = 'Success', data } = {}) => {
  const payload = {
    status: 'success',
    message,
  };

  if (data !== undefined) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

const sendError = (res, { statusCode = 500, message = 'Internal Server Error', errors } = {}) => {
  const payload = {
    status: 'error',
    message,
  };

  if (errors !== undefined) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

const sendNotImplemented = (res, message = 'Endpoint is not implemented yet') => {
  return sendError(res, {
    statusCode: 501,
    message,
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendNotImplemented,
};
