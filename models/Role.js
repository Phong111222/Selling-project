const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role_id: {
    required: true,
    type: Number,
  },
  role_name: {
    required: true,
    type: String,
  },
  role_desc: {
    required: true,
    type: String,
    minlength: [10, 'role_desc must have more than 10 characters'],
  },
});

RoleSchema.static('getAllRoles', function () {
  return this.find();
});

RoleSchema.static('deleteRoleByID', function (id) {
  return this.deleteOne({ _id: id });
});

module.exports = mongoose.model('roles', RoleSchema);
