exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('meals').del() // delete all footnotes first

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('meals').insert(
          { name: 'Breakfast' }, 'id'),
        knex('meals').insert(
          { name: 'Snacks' }, 'id'),
        knex('meals').insert(
          { name: 'Lunch' }, 'id'),
        knex('meals').insert(
          { name: 'Dinner' }, 'id')
        .then(() => console.log('Seeding meals complete!'))
        .catch(error => console.log(`Error seeding meals data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding meals data: ${error}`));
};
