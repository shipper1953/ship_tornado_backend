exports.seed = async function(knex) {
  await knex('roles').del();
  await knex('roles').insert([
    { id: '11111111-1111-1111-1111-111111111111', name: 'Super Admin' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Admin' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'User' },
  ]);
};
