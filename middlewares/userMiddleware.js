const jwt = require('jsonwebtoken');
const ErrorResponse = require('../models/response/error');

const checkHeader = (req, _, next) => {
  if (req.originalUrl === '/api/v1/auth/login') return next();
  if (req.headers['authorization']) {
    jwt.verify(
      req.headers['authorization'],
      process.env.JWT_SECRET,
      function (err, _) {
        if (err) {
          throw new ErrorResponse(401, 'Token expired');
        }
      }
    );
    return next();
  }
  throw new ErrorResponse(401, 'unauthorized');
};

module.exports = { checkHeader };
