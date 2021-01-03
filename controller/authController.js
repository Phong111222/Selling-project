const SuccessResponse = require('../models/response/success');
const ErrorResponse = require('../models/response/error');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

exports.register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const hashPass = await User.hashPass(password);
  const user = new User({ name, email, password });
  const rs = await user.save();
  res.status(200).json(new SuccessResponse(200, rs));
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const check_user = await User.findUserByEmail(email);
  if (!check_user) {
    return next(new ErrorResponse(404, 'user is not existed'));
  } else {
    if (User.checkPass(password, check_user.password)) {
      const token = jwt.sign(
        {
          email: check_user.email,
          name: check_user.name,
          role: check_user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      res.status(200).json(
        new SuccessResponse(200, {
          token,
          email: check_user.email,
          name: check_user.name,
        })
      );
    } else return next(new ErrorResponse(400, 'Wrong password'));
  }
});
