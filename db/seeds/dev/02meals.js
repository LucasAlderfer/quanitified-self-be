exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
  .then(() => knex('meals').del())
  .then(() => {
    return Promise.all([
      knex('meals').insert(
        { name: 'Breakfast' }, 'id'),
      knex('meals').insert(
        { name: 'Snack' }, 'id'),
      knex('meals').insert(
        { name: 'Lunch' }, 'id'),
      knex('meals').insert(
        { name: 'Dinner' }, 'id')
      .then(() => console.log('Seeding meals complete!'))
      .catch(error => console.log(`Error seeding meals data: ${error}`))
    ])
  })
  .catch(error => console.log(`Error seeding meals data: ${error}`));
};
