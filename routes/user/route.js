const express = require('express');
const ErrorResponse = require('../../models/response/error');
const User = require('../../models/User');
const SuccessResponse = require('../../models/response/success');
const route = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const { authorize } = require('../../middlewares/authorize');
const UserController = require('../../controller/userController');
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

  UserController.getAllUser
);
// get detail of a user by id
route.get(
  '/:id',

  UserController.getUserByID
);

route.delete(
  '/:userID',
  authMiddleware,
  authorize('admin', 'guest'),

  UserController.deleteUserByID
);

// update user
route.post(
  '/:userID',
  authMiddleware,

  UserController.updateUserByID
);

// update email

module.exports = route;
