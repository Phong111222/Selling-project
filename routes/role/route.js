const express = require('express');
const Role = require('../../models/Role');
const route = express.Router();

route.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({ msg: 'bad request' });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const rs = await Role.deleteRoleByID(id);
    res.status(200).json(rs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = route;
