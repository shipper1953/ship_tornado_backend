const express = require('express');
const router = express.Router();
const db = require('../../db');

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizeRole');

// Only accessible to admin (role_id = 1)
router.get('/users', authMiddleware, authorizeRole(1), async (req, res) => {
  try {
    const users = await db('users').select('id', 'email', 'company_id', 'role_id');
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
