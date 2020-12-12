const ErrorResponse = require('../models/response/error');

module.exports = (err, _, res, next) => {
  // validator

  let errors = { ...err };
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
