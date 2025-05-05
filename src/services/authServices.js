const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../../knex'); // or require('../db') if alias

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.register = async ({ email, password, company_id, role_id }) => {
  const existing = await knex('users').where({ email }).first();
  if (existing) throw new Error('User already exists');

  const password_hash = await bcrypt.hash(password, 10);
  const [user] = await knex('users')
    .insert({ email, password_hash, company_id })
    .returning(['id', 'email', 'company_id']);

  await knex('user_roles').insert({ user_id: user.id, role_id });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await knex('users').where({ email }).first();
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error('Invalid credentials');

  const roles = await knex('user_roles')
    .join('roles', 'user_roles.role_id', 'roles.id')
    .where('user_roles.user_id', user.id)
    .pluck('roles.name');

  const token = jwt.sign({
    sub: user.id,
    company_id: user.company_id,
    roles,
  }, JWT_SECRET, { expiresIn: '1d' });

  return token;
};
