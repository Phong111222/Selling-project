const jwt = require('jsonwebtoken');
const ErrorResponse = require('../models/response/error');

module.exports = (req, _, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (
    req.originalUrl === '/api/v1/auth/login' ||
    req.originalUrl === '/api/v1/auth/register'
  )
    return next();
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, _) {
      if (err) {
        throw new ErrorResponse(401, 'Token expired');
      }
    });

    return next();
  }
  throw new ErrorResponse(401, 'unauthorized');
};
