/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasColumn('tasks', 'completed').then(function(exists) {
        if (!exists) {
            return knex.schema.table('tasks', function(t) {
                t.boolean('completed').notNullable().defaultTo(false);
            });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasColumn('tasks', 'completed').then(function(exists) {
        if (exists) {
            return knex.schema.table('tasks', function(t) {
                t.dropColumn('completed');
            });
        }
    });
};