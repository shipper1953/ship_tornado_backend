// filepath: /Users/taylorgregg/Documents/ship-tornado/backend/migrations/20250508_update_users_role_id_to_uuid.js
exports.up = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.uuid('role_id').alter();
    });
};

exports.down = async function(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.integer('role_id').alter();
    });
};