const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('secret123', 10);

  await knex('users').insert([
    {
      id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      email: 'admin@example.com',
      password: hashedPassword,
      company_id: '11111111-1111-1111-1111-111111111111',
      role_id: 1
    }
  ]);
};
