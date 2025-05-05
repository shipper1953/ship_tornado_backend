exports.up = function (knex) {
    return knex.schema.createTable("orders", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("customer_name").notNullable();
      table.string("customer_email").notNullable();
      table.string("order_number").unique().notNullable();
      table.string("status").notNullable().defaultTo("pending");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("orders");
  };
  