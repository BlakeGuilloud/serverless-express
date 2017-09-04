const express = require('express');
const { postTodo, getTodo, getTodos } = require('./controller');

const router = express.Router();

router.post('/', postTodo);
router.get('/', getTodos);
router.get('/:todoId', getTodo);

module.exports = router;