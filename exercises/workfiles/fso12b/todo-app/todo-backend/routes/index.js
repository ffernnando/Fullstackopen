const express = require('express');
const redis = require('../redis');
const router = express.Router();


const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const todo_key = 'added_todos';
  const todos = await redis.getAsync(todo_key);

  res.send({ 'added_todos': todos })
});

module.exports = router;
