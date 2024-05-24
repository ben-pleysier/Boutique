
exports.up = function(knex) {
  return knex.schema
    .createTable('categories', async function (table) {
      table.increments('id');
      table.string('name', 50);
      table.string('short_description');
      table.text('long_description');
      table.string('image', 100);
    })
    .createTable('customers', async function (table) {
      table.increments('id');
      table.string('first_name', 50);
      table.string('last_name', 50);
      table.string('street', 100);
      table.string('city', 50);
      table.string('postcode', 50);
      table.string('country', 100);
      table.string('email', 100);
      table.string('phone', 20);
      table.date('creation_date');
    })
    .createTable('category_products', async function (table) {
      table.increments('id');
      table.string('name', 100);
      table.decimal('price');
      table.string('short_description');
      table.text('long_description');
      table.string('image', 100);
      table.date('update_date');
      table.boolean('live');
      table.boolean('fearured');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .createTable('customer_orders', async function (table) {
      table.increments('id');
      table.date('order_date');
      table.decimal('amount');
      table.string('street', 100);
      table.string('city', 50);
      table.string('postcode', 50);
      table.string('country', 100);
      table.date('shipped_date');
      table.string('tracking_number');
      table.integer('customer_id').unsigned();
      table.foreign('customer_id').references('id').inTable('customers').onUpdate('CASCADE').onDelete('CASCADE');
    })
    .createTable('customer_order_items', async function (table) {
      table.increments('id');
      table.integer('product_id');
      table.string('name', 100);
      table.decimal('price');
      table.integer('quantity');
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('id').inTable('customer_orders').onUpdate('CASCADE').onDelete('CASCADE');
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTable('customer_order_items')
    .dropTable('customer_orders')
    .dropTable('category_products')
    .dropTable('customers')
    .dropTable('categories')
};
