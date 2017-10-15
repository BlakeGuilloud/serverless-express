const { sendSuccess, sendError } = require('./responses');
const { createTodo, fetchTodo, fetchTodos } = require('./service');

function postTodo(req, res) {
  return Promise.resolve(req)
    .then((request) => createTodo(request.body.todo))
    .then(sendSuccess(res))
    .catch(sendError(res));
}

function getTodo(req, res) {
  return Promise.resolve(req)
    .then((request) => fetchTodo(request.params.todoId))
    .then(sendSuccess(res))
    .catch(sendError(res));
}

function getTodos(req, res) {
  return Promise.resolve(req)
    .then(fetchTodos)
    .then(sendSuccess(res))
    .catch(sendError(res));
}

module.exports = {
  postTodo,
  getTodo,
  getTodos,
};
