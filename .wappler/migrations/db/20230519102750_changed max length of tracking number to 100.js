
exports.up = function(knex) {
  return knex.schema
    .table('customer_orders', async function (table) {
      table.string('tracking_number', 100).alter();
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('customer_orders', async function (table) {
      table.string('tracking_number', 255).alter();
    })
};
