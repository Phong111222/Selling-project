module.exports = (err, _, res, next) => {
  res.status(err.statusCode).json({
    status: 'error',
    status_code: err.statusCode,
    message: err.message,
  });
};
