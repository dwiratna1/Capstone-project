const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, {
      statusCode: 401,
      message: 'Authentication token is required',
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      return sendError(res, {
        statusCode: 500,
        message: 'JWT_SECRET is not configured',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(res, {
      statusCode: 401,
      message: 'Invalid or expired authentication token',
    });
  }
};

module.exports = {
  authenticate,
};
