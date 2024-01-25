const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const counter = parseInt((await getAsync("added_todos")) || 0) //get the key added_todos from getasync and put it to counter
  setAsync("added_todos", counter + 1) //update added_todos value
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  res.json(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;
  const todo = {
    //not including id, since we cant update it (immutable)
    text: body.text,
    done: body.done,
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, todo, { new: true })//id is found from req.todo._id
  res.status(200).json(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
