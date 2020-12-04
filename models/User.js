const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
      message: 'invalid Email',
    },
  },
  password: {
    required: true,
    type: String,
    minlength: [6, 'password must have more than 6 characters'],
  },
  isActive: {
    default: false,
    type: Boolean,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.static('findUserByEmail', function (email) {
  return this.findOne({ email });
});
UserSchema.static('checkPass', function (pass, hashPass) {
  return bcrypt.compare(pass, hashPass);
});
UserSchema.static('hashPass', async function (password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
});
UserSchema.static('updatePassword', function (email, password) {
  return this.updateOne(
    { email },
    {
      $set: { password },
    }
  );
});
module.exports = mongoose.model('users', UserSchema);
