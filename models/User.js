const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('runValidators', true);

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: [6, 'name must have at least 6 characters'],
    },
    email: {
      required: true,
      type: String,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
          );
        },
        message: 'invalid Email',
      },
      unique: true, // the same as primary key in SQL
    },
    password: {
      required: true,
      type: String,
      minlength: [6, 'password must have more than 6 characters'],
    },
    isActive: {
      default: true,
      type: Boolean,
    },

    role: {
      type: String,
      default: 'guest',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
/**
 * (
 *  $lookup:{
 *    from:"",
 *    localField:"",
 *    foreignField:"",
 *    at:"",
 *  }
 * )
 */

UserSchema.virtual('role_detail', {
  ref: 'roles', // from
  localField: 'role',
  foreignField: 'role_name',
  justOne: true,
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(this.password, salt);
  this.password = hashPass;
  next();
});

UserSchema.pre('findOneAndUpdate', async function () {
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(this._update.password, salt);

  this._update.password = hashPass;
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
