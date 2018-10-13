exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('mealFoods').del() // delete all footnotes first
  .then(() => knex('meals').del()) // delete all footnotes first
  .then(() => knex('foods').del()) // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('foods').insert(
          { name: 'banana', calories: 150 }, 'id'),
        knex('foods').insert(
          { name: 'apple', calories: 100 }, 'id'),
        knex('foods').insert(
          { name: 'strawberries', calories: 50 }, 'id'),
        knex('foods').insert(
          { name: 'cherries', calories: 75 }, 'id'),
        knex('foods').insert(
          { name: 'meatloaf', calories: 300 }, 'id')
        .then(() => console.log('Seeding foods complete!'))
        .catch(error => console.log(`Error seeding foods data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding foods data: ${error}`));
};
