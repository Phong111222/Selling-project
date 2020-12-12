const express = require('express');
const Role = require('../../models/Role');
const route = express.Router();
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');
const SuccessResponse = require('../../models/response/success');
route.post(
  '/',
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { role_name, role_desc } = req.body;

    const ListRoles = await Role.getAllRoles();
    let length = ListRoles.length;
    const role_id = length ? ++length : 0;
    const role = new Role({
      role_id,
      role_name,
      role_desc,
    });

    const rs = await role.save();
    res.status(200).json(rs);
  })
);

// route.delete(
//   '/:id',
//   authMiddleware,
//   asyncMiddleware(async (req, res) => {
//     const { id } = req.params;

//     const rs = await Role.deleteRoleByID(id);
//     res.status(200).json(rs);
//   })
// );

route.patch(
  '',
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;
    const { role_name, role_desc } = req.body;

    const rs = await Role.updateRoleByID(id, role_name, role_desc);
    console.log(rs);
    res.status(200).json(new SuccessResponse(201, rs));
  })
);

route.delete(
  '',
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    const { id } = req.query;

    const rs = await Role.deleteRoleByID(id);
    res.status(200).json(new SuccessResponse(200, rs));
  })
);

module.exports = route;
