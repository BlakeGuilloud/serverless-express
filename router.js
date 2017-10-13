const express = require('express');
const { postTodo, getTodo } = require('./controller');

const router = express.Router();

router.post('/', postTodo);
router.get('/:todoId', getTodo);

module.exports = router;