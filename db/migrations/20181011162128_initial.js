exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('calories');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('meals', function(table) {
      table.increments('id').primary();
      table.string('name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('mealFoods', function(table) {
      table.increments('id').primary();
      table.integer('foodId').unsigned()
      table.foreign('foodId')
        .references('foods.id');
      table.integer('mealId').unsigned()
      table.foreign('mealId')
        .references('meals.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealFoods'),
    knex.schema.dropTable('foods'),
    knex.schema.dropTable('meals'),
  ]);
}
