exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', (table) => {
      table.increments('id').primary();
      table.text('task');
      table.date('due_date');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos')
  ]);
};
