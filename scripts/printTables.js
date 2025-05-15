// scripts/printTables.js
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

async function main() {
  try {
    const companies = await knex('companies').select('*');
    const roles = await knex('roles').select('*');

    console.log('Companies:', companies);
    console.log('Roles:', roles);
  } catch (err) {
    console.error('Error querying tables:', err);
  } finally {
    await knex.destroy();
  }
}

main();
