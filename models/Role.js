const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    role_name: {
      required: true,
      unique: true,
      type: String,
    },
    role_desc: {
      required: true,
      type: String,
      minlength: [10, 'role_desc must have more than 10 characters'],
    },
  },
  { timestamps: true }
);

RoleSchema.static('getAllRoles', function () {
  return this.find();
});

RoleSchema.static('deleteRoleByID', function (id) {
  return this.deleteOne({ _id: id });
});

RoleSchema.static('updateRoleByID', function (id, role_name, role_desc) {
  return this.updateOne(
    { _id: id },
    { $set: { role_name: role_name, role_desc: role_desc } }
  );
});

module.exports = mongoose.model('roles', RoleSchema);
