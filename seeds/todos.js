
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {
      return Promise.all([
        knex('todos').insert({
          task: "create api using express js",
          due_date: '2018-Jul-06'
        })
        .then(() => {
          console.log('Seeding Complete!');
        })
        .catch(error => {
          console.log(`Error seeding data: ${error}`);
        })
      ])
    });
};
