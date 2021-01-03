const asyncMiddleware = require('../middlewares/asyncMiddleware');
const SuccessResponse = require('../models/response/success');
const Role = require('../models/Role');

exports.getAllRole = asyncMiddleware(async (_, res, __) => {
  const roles = await Role.find();
  res.status(200).json(new SuccessResponse(200, roles));
});

exports.createNewRole = asyncMiddleware(async (req, res) => {
  const { role_name, role_desc } = req.body;

  const role = new Role({
    role_name,
    role_desc,
  });

  const rs = await role.save();
  res.status(200).json(rs);
});

exports.deleteRoleById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  const rs = await Role.deleteRoleByID(id);
  res.status(200).json(new SuccessResponse(200, rs));
});

exports.updateRoleById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { role_name, role_desc } = req.body;

  const rs = await Role.updateRoleByID(id, role_name, role_desc);

  res.status(200).json(new SuccessResponse(201, rs));
});
