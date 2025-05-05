exports.seed = async function (knex) {
    await knex('user_roles').del();
  
    await knex('user_roles').insert([
      {
        user_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        role_id: 1,
      },
    ]);
  };
  