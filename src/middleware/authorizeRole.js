// src/middleware/authorizeRole.js
module.exports = function authorizeRole(requiredRoleId) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.user.role_id !== requiredRoleId) {
      return res.status(403).json({ error: 'Forbidden – insufficient role privileges' });
    }

    next();
  };
};
