const express = require('express');
const ErrorResponse = require('../../models/response/error');
const User = require('../../models/User');
const SuccessResponse = require('../../models/response/success');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const route = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
route.patch('/Change-password', async (req, res) => {
  try {
    const { email, cur_password, new_password } = req.body;

    const check_user = await User.findUserByEmail(email);
    if (!check_user) {
      throw new ErrorResponse(404, 'user is not existed');
    }
    if (!(await User.checkPass(cur_password, check_user.password))) {
      throw new ErrorResponse(400, 'wrong password');
    }
    if (!(await User.checkPass(new_password, check_user.password))) {
      const hashPass = await User.hashPass(new_password);
      const rs = await User.updatePassword(email, hashPass);
      res.status(200).json(new SuccessResponse(200, rs));
    } else {
      throw new ErrorResponse(400, 'new password is the same ass old password');
    }
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

//get all user
route.get(
  '/all',
  asyncMiddleware(async (_, res, next) => {
    const users = await User.find().select('-password');
    if (!users.length) {
      return next(new ErrorResponse(404, 'No user'));
    }
    res.status(200).json(new SuccessResponse(200, users));
  })
);
// get detail of a user by id
route.get(
  '/:id',
  asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    if (!id.trim()) {
      return next(new ErrorResponse(400, 'ID is empty'));
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      return next(new ErrorResponse(404, 'User is not found'));
    }

    res.status(200).json(new SuccessResponse(200, user));
  })
);

route.delete(
  '/:userID',
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    const { userID } = req.params;
    if (!userID.trim()) {
      return next(new ErrorResponse(400, 'userID is empty'));
    }
    const deleteUser = await User.findByIdAndDelete(userID);
    if (!deleteUser) {
      return next(new ErrorResponse(400, 'Can not delete user'));
    }
    res.status(200).json(new SuccessResponse(200));
  })
);

module.exports = route;
