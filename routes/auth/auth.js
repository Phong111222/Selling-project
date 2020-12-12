const express = require('express');
const ErrorResponse = require('../../models/response/error');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const SuccessResponse = require('../../models/response/success');
const route = express.Router();

route.post(
  '/register',
  asyncMiddleware(async (req, res, next) => {
    const { name, email, password } = req.body;
    const check_user = await User.findUserByEmail(email);
    if (check_user) {
      next(new ErrorResponse(400, `email was existed`));
    } else {
      const hashPass = await User.hashPass(password);
      const user = new User({ name, email, password: hashPass });
      const rs = await user.save();
      res.status(200).json(new SuccessResponse(200, rs));
    }
  })
);

route.post(
  '/login',
  asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body;
    const check_user = await User.findUserByEmail(email);
    if (!check_user) {
      next(new ErrorResponse(404, 'user is not existed'));
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
            expiresIn: '30s',
          }
        );
        res.status(200).json(
          new SuccessResponse(200, {
            token,
            email: check_user.email,
            name: check_user.name,
          })
        );
      } else next(new ErrorResponse(400, 'Wrong password'));
    }
  })
);

module.exports = route;
