const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

router.get('/', async (req, res) => {
    const counter = await getAsync("added_todos")//Get key added todos
    res.send({ added_todos: (parseInt(counter)) || 0}) //return it to added_todos as json
  });
  

  module.exports =router ;