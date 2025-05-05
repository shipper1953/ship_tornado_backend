exports.up = function (knex) {
    return knex.schema.createTable("shipments", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table
        .uuid("order_id")
        .references("id")
        .inTable("orders")
        .onDelete("CASCADE");
  
      table.string("carrier");
      table.string("service");
      table.string("rate_id");
      table.string("label_url");
      table.string("tracking_number");
      table.string("shipment_status").defaultTo("label_created");
      table.timestamp("est_delivery_date");
  
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("shipments");
  };
  