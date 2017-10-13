const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const todoRouter = require('./router');

app.use(bodyParser.json({ strict: false }));

app.use('/todos', todoRouter)

module.exports.handler = serverless(app);