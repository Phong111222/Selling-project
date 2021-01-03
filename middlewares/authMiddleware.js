const jwt = require('jsonwebtoken');
const ErrorResponse = require('../models/response/error');
const User = require('../models/User');

module.exports = async (req, _, next) => {
  if (!req.headers['authorization'])
    return next(new ErrorResponse(401, 'unauthorized'));
  else {
    const token = req.headers['authorization'].split(' ')[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function (err, _) {
        if (err) {
          return next(new ErrorResponse(401, 'Token expired'));
        }
      });

      const { email } = jwt.decode(token);
      const user = await User.findUserByEmail(email);

      if (user) {
        // tao 1 prop trong req
        req.user = jwt.decode(token);
        return next();
      } else return next(new ErrorResponse(400, 'Bad Request'));
    }
  }
  next(new ErrorResponse(401, 'unauthorized'));
};
