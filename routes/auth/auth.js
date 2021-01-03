const express = require('express');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');
const { authorize } = require('../../middlewares/authorize');
const authController = require('../../controller/authController');
const route = express.Router();

route.get(
  '/test',
  authMiddleware,
  authorize('admin'),
  asyncMiddleware(async (req, res, next) => {
    res.status(200).json({ success: true });
  })
);

route.post('/register', authController.register);

route.post('/login', authController.login);

module.exports = route;
