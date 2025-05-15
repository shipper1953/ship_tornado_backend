exports.up = async function(knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

  // Step 1: Drop all foreign keys referencing roles.id
  await knex.schema.alterTable('users', table => {
    table.dropForeign('role_id');
  });

  await knex.schema.alterTable('user_roles', table => {
    table.dropForeign('role_id');
  });

  // Step 2: Drop primary key, convert id to UUID, reapply PK
  await knex.schema.alterTable('roles', table => {
    table.dropPrimary();
  });

  await knex.schema.alterTable('roles', table => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).alter();
  });

  await knex.schema.alterTable('roles', table => {
    table.primary('id');
  });

  // Step 3: Convert user_roles.role_id to UUID
  await knex.schema.alterTable('user_roles', table => {
    table.uuid('role_id').alter();
  });

  // Step 4: Add role_id to users if not exists, then convert to UUID
  const hasRoleId = await knex.schema.hasColumn('users', 'role_id');
  if (!hasRoleId) {
    await knex.schema.alterTable('users', table => {
      table.uuid('role_id');
    });
  } else {
    await knex.schema.alterTable('users', table => {
      table.uuid('role_id').alter();
    });
  }

  // Step 5: Reapply foreign keys
  await knex.schema.alterTable('users', table => {
    table.foreign('role_id').references('roles.id').onDelete('SET NULL');
  });

  await knex.schema.alterTable('user_roles', table => {
    table.foreign('role_id').references('roles.id').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable('users', table => {
    table.dropForeign('role_id');
    table.dropColumn('role_id');
  });

  await knex.schema.alterTable('user_roles', table => {
    table.dropForeign('role_id');
    table.integer('role_id').alter();
  });

  await knex.schema.alterTable('roles', table => {
    table.dropPrimary();
    table.integer('id').alter();
    table.primary('id');
  });
};
