const express = require('express');
const ErrorResponse = require('../../models/response/error');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const route = express.Router();

route.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const check_user = await User.findUserByEmail(email);
    if (check_user) {
      throw new ErrorResponse(400, `email was existed`);
    } else {
      const hashPass = await User.hashPass(password);
      const user = new User({ name, email, password: hashPass });
      const rs = await user.save();
      res.status(200).json(rs);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

route.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const check_user = await User.findUserByEmail(email);
    if (!check_user) {
      throw new ErrorResponse(404, 'user is not existed');
    } else {
      if (User.checkPass(password, check_user.password)) {
        const token = jwt.sign(
          { email: check_user.email, name: check_user.name },
          process.env.JWT_SECRET,
          { expiresIn: '30s' }
        );
        res.json({
          token,
          email: check_user.email,
          name: check_user.name,
        });
      } else throw new ErrorResponse(400, 'Wrong password');
    }
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = route;
