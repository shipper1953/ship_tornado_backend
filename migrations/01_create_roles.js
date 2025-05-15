exports.up = async function (knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

  return knex.schema.createTable("roles", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles");
};
