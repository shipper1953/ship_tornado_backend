const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // Use .env for real projects

exports.register = async (email, password, company_id) => {
  // Check for existing user
  const existingUser = await db('users').where({ email }).first();
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Insert user into database
  const [user] = await db('users')
    .insert({
      email,
      password: hashedPassword,
      company_id,
      role_id: 1, // Default role (e.g., Admin); update as needed
    })
    .returning(['id', 'email', 'company_id', 'role_id']);

  return user;
};

exports.login = async (email, password) => {
  const user = await db('users').where({ email }).first();
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, company_id: user.company_id, role_id: user.role_id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};
