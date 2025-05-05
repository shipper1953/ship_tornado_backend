exports.seed = async function(knex) {
    await knex('roles').del();
    await knex('roles').insert([
      { id: 1, name: 'Super Admin' },
      { id: 2, name: 'Admin' },
      { id: 3, name: 'User' },
    ]);
  };
  