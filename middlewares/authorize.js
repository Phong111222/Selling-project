//... meaning is rest operator in function

const ErrorResponse = require('../models/response/error');

exports.authorize = (...roles) => (req, res, next) => {
  // roles is an array

  if (!roles.includes(req.user.role))
    return next(new ErrorResponse(401, 'Unauthorization'));
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(403, "Don't have permission to access thi route")
    );
  }
  next();
};
