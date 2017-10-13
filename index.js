const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const todoRouter = require('./router');

app.use(bodyParser.json({ strict: false }));

app.use('/todos', todoRouter)

module.exports.handler = serverless(app);

// curl -H "Content-Type: application/json" -X POST {$BASE_DOMAIN}/todos -d '{"todoId": "blueberry", "todo": "Walk the dogs"}'
// curl -H "Content-Type: application/json" -X GET {$BASE_DOMAIN}/todos/walkDogs