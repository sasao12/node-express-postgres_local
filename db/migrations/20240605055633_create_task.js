/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('tasks').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('tasks', function(t) {
                t.increments('id').primary().unsigned().notNullable();
                t.integer('user_id').notNullable().references('id').inTable('users');
                t.string('content').notNullable();
            });
        }else{
            return new Error("The table already exists");
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('tasks').then(function(exists) {
        if (exists) {
            return knex.schema.dropTable('tasks');
        }
    });
};