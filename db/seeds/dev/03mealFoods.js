exports.seed = function(knex, Promise) {
  return knex('mealFoods').del()
  .then(() => {
    return Promise.all([
      knex('mealFoods').insert({
        foodId: 2, mealId: 1 }, 'id'),
      knex('mealFoods').insert({
        foodId: 3, mealId: 1 }, 'id'),
      knex('mealFoods').insert({
        foodId: 1, mealId: 2 }, 'id'),
      knex('mealFoods').insert({
        foodId: 4, mealId: 3 }, 'id'),
      knex('mealFoods').insert({
        foodId: 2, mealId: 3 }, 'id'),
      knex('mealFoods').insert({
        foodId: 1, mealId: 4 }, 'id'),
      knex('mealFoods').insert({
        foodId: 3, mealId: 4 }, 'id'),
      knex('mealFoods').insert({
        foodId: 5, mealId: 4 }, 'id')
      .then(() => console.log('Seeding mealFoods complete!'))
      .catch(error => console.log(`Error seeding mealFoods data: ${error}`))
    ])
  })
  .catch(error => console.log(`Error seeding mealFoods data: ${error}`));
};
