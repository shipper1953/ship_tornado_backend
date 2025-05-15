// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db'); // ✅ Correct relative path to DB

const login = async ({ email, password }) => {
  const user = await db('users')
  .select('users.*', 'user_roles.role_id')
  .leftJoin('user_roles', 'users.id', 'user_roles.user_id')
  .where('users.email', email)
  .first();

  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      company_id: user.company_id,
      role_id: user.role_id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      company_id: user.company_id,
    },
  };
};

const register = async ({ email, password, company_id, role_id }) => {
  const password_hash = await bcrypt.hash(password, 10);
  const [user] = await db('users')
    .insert({ email, password_hash, company_id, role_id })
    .returning(['id', 'email', 'company_id', 'role_id']);

  return user;
};

module.exports = {
  login,
  register,
};
