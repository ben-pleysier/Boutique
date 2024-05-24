
exports.up = function(knex) {
  return knex.schema
    .table('customers', async function (table) {
      table.string('password');
    })

};

exports.down = function(knex) {
  return knex.schema
    .table('customers', async function (table) {
      table.dropColumn('password');
    })
};
