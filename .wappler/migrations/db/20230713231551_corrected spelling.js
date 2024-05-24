
exports.up = function(knex) {
  return knex.schema
    .table('category_products', async function (table) {
      table.renameColumn('fearured', 'featured');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('category_products', async function (table) {
      table.renameColumn('featured', 'fearured');
    })
};
