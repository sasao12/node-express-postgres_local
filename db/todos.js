const knex = require('../knex');

module.exports = {
  getAllTodos() {
    return knex('todos').select('*');
  },
  
  createTodo(content) {
    return knex('todos').insert({ content, completed: false }).returning('*');
  },
  
  updateTodo(id, content) {
    return knex('todos').where({ id }).update({ content }).returning('*');
  },
  
  deleteTodo(id) {
    return knex('todos').where({ id }).del();
  },
  
  toggleTodoComplete(id, completed) {
    return knex('todos').where({ id }).update({ completed }).returning('*');
  }
};