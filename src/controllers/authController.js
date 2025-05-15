// src/controllers/authController.js
const authService = require('../services/authService');
const db = require('../../db');

exports.register = async (req, res) => {
  const { email, password, company_id, role_id } = req.body;
  try {
    const user = await authService.register({ email, password, company_id, role_id });
    res.status(201).json(user);
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login({ email, password });
    res.status(200).json({ token, user });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(401).json({ error: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await db('users')
      .where({ id: req.user.sub })
      .first()
      .select('id', 'email', 'company_id');

    const roles = await db('user_roles')
      .join('roles', 'user_roles.role_id', 'roles.id')
      .where('user_roles.user_id', req.user.sub)
      .pluck('roles.name');

    res.json({ ...user, roles });
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
