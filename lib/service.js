const dynamoDb = require('./dynamo');
const uuidv4 = require('uuid/v4');

const TODOS_TABLE = process.env.TODOS_TABLE;

function createTodo(todo) {
  const Item = { todoId: uuidv4(), todo };

  const params = {
    TableName: TODOS_TABLE,
    Item,
  };

  return new Promise((resolve, reject) => {
    dynamoDb.put(params, (error) => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(Item);
      }
    });
  });
}

function fetchTodo(todoId, callback) {
  const params = {
    TableName: TODOS_TABLE,
    Key: { todoId },
  };

  return new Promise((resolve, reject) => {
    dynamoDb.get(params, (error, result) => {
      if (error) {
        reject(new Error(error));
      } else if (result.Item) {
        resolve(result.Item);
      } else {
        reject(new Error(`${todoId} was not found.`));
      }
    });
  });
}


module.exports = {
  createTodo,
  fetchTodo,
};