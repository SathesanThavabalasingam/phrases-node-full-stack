// create phrases.js

exports.up = function(knex, Promise) {
    return knex.schema.createTable('phrases', (table) => {
      table.increments('id').unsigned().primary();
      table.string('phrase');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('phrases');
};
