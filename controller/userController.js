const asyncMiddleware = require('../middlewares/asyncMiddleware');
const ErrorResponse = require('../models/response/error');
const SuccessResponse = require('../models/response/success');
const User = require('../models/User');

exports.getAllUser = asyncMiddleware(async (_, res, next) => {
  const users = await User.find()
    .populate({
      path: 'role_detail',
      select: {
        role_name: 1,
        role_desc: 1,
        _id: 0,
      },
    })
    .select('-password ');

  if (!users.length) {
    return next(new ErrorResponse(404, 'No user'));
  }
  res.status(200).json(new SuccessResponse(200, users));
});

exports.getUserByID = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  if (!id.trim()) {
    return next(new ErrorResponse(400, 'ID is empty'));
  }

  const user = await User.findById(id).select('-password');
  if (!user) {
    return next(new ErrorResponse(404, 'User is not found'));
  }

  res.status(200).json(new SuccessResponse(200, user));
});

exports.deleteUserByID = asyncMiddleware(async (req, res, next) => {
  const { userID } = req.params;
  if (!userID.trim()) {
    return next(new ErrorResponse(400, 'userID is empty'));
  }
  const deleteUser = await User.findByIdAndDelete(userID);
  if (!deleteUser) {
    return next(new ErrorResponse(400, 'Can not delete user'));
  }
  res.status(200).json(new SuccessResponse(200, deleteUser));
});

exports.updateUserByID = asyncMiddleware(async (req, res, next) => {
  const { userID } = req.params;
  const { name, password } = req.body;

  if (!userID.trim()) {
    return next(new ErrorResponse(400, 'userID is empty'));
  }
  const doc = await User.findById(userID);

  if (!doc) {
    return next(new ErrorResponse(404, 'User is not found'));
  }

  doc.name = name;
  doc.password = password;
  const UpdateUser = await doc.save();
  if (!UpdateUser) {
    return next(new ErrorResponse(400, 'Can update password'));
  }
  res.status(200).json(new SuccessResponse(200, UpdateUser));
});
