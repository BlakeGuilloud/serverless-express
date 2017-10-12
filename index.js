const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const express = require('express');

const app = express();

const TODOS_TABLE = process.env.TODOS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('hellooo');
});

app.get('/todos/:todoId', (req, res) => {
  const params = {
    TableName: TODOS_TABLE,
    Key: {
      todoId: req.params.todoId,
    },
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      res.status(400)
        .json({ error: 'Could not fetch todo' });
    } else if (result.Item) {
      const { todoId, todo } = result.Item;

      res.json({ todoId, todo });
    } else {
      res.status(404)
        .json({ error: 'Todo not found' });
    }
  });
});

app.post('/todos', (req, res) => {
  const { todoId, todo } = req.body;

  const params = {
    TableName: TODOS_TABLE,
    Item: {
      todoId,
      todo,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      res.status(400)
        .json({ error: 'Could not create todo' });
    } else {
      res.json({ todoId, todo });
    }
  });
});

module.exports.handler = serverless(app);

// curl -H "Content-Type: application/json" -X POST {$BASE_DOMAIN}/todos -d '{"todoId": "blueberry", "todo": "Walk the dogs"}'
// curl -H "Content-Type: application/json" -X GET {$BASE_DOMAIN}/todos/walkDogs