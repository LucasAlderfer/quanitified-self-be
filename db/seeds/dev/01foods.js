exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
  .then(() => knex('foods').del())
  .then(() => {
    return Promise.all([
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
    ])
  })
  .catch(error => console.log(`Error seeding foods data: ${error}`));
};
