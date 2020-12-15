const ErrorResponse = require('../models/response/error');

module.exports = (err, _, res, next) => {
  let errors = { ...err };

  // validator
  // Mongo Duplicate docs
  if (err.code === 11000) {
    errors = new ErrorResponse(400, err.keyValue);

    for (let i in errors.message) {
      errors.message[i] = `${i} is already existed`;
    }
  }

  // Mongo validator

  if (err.name === 'ValidationError') {
    errors = new ErrorResponse(400, err.errors);
    for (let i in errors.message) {
      errors.message[i] = errors.message[i].message;
    }
  }

  res.status(errors.statusCode).json({
    status: false,
    status_code: errors.statusCode,
    message: errors.message,
  });
  /*
    {code,message,success:false}
  */
  next();
};
