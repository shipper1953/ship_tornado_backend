const knex = require('../../db');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await knex('roles').select();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const [newRole] = await knex('roles').insert({ name }).returning('*');
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await knex('roles').where({ id: req.params.id }).first();
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { name } = req.body;
    const [updatedRole] = await knex('roles')
      .where({ id: req.params.id })
      .update({ name })
      .returning('*');
    res.json(updatedRole);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await knex('roles').where({ id: req.params.id }).del();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
