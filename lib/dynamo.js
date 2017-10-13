const AWS = require('aws-sdk');

let dynamoDb;

if (process.env.IS_OFFLINE) {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDb;