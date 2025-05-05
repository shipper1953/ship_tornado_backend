const authService = require('../services/authService');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const { email, password, company_id } = req.body;

    if (!email || !password || !company_id) {
      return res.status(400).json({ error: 'Email, password, and company_id are required.' });
    }

    const user = await authService.register(email, password, company_id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
    try {
      const user = req.user; // set by authMiddleware
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  };
