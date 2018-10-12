exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('mealFoods').del() // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('mealFoods').insert({
          food_id: 2, meal_id: 1 }, 'id'),
        knex('mealFoods').insert({
          food_id: 3, meal_id: 1 }, 'id'),
        knex('mealFoods').insert({
          food_id: 1, meal_id: 2 }, 'id'),
        knex('mealFoods').insert({
          food_id: 4, meal_id: 3 }, 'id'),
        knex('mealFoods').insert({
          food_id: 2, meal_id: 3 }, 'id'),
        knex('mealFoods').insert({
          food_id: 1, meal_id: 4 }, 'id'),
        knex('mealFoods').insert({
          food_id: 3, meal_id: 4 }, 'id'),
        knex('mealFoods').insert({
          food_id: 5, meal_id: 4 }, 'id')
        .then(() => console.log('Seeding mealFoods complete!'))
        .catch(error => console.log(`Error seeding mealFoods data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding mealFoods data: ${error}`));
};