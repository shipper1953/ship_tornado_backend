exports.seed = async function (knex) {
    await knex('companies').del();
  
    await knex('companies').insert([
      {
        id: '11111111-1111-1111-1111-111111111111', // ✅ valid UUID
        name: 'ShipTornado HQ',
      },
    ]);
  };
  
  