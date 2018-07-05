const router = require('express').Router();
const database  = require('../db');

// handling get and post request
router.route('/')
  // all todos
  .get((req, res) => {
    database('todos').select()
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })

  // adding todo
  .post((req, res) => {
    const todoData = req.body;
    // validate the presence of task and due_date
    for (let requiredParams of ['task', 'due_date']) {
      if (!todoData[requiredParams]) {
        return res
          .status(422)
          .send({ error: `You are missing "${requiredParams}" property` });
      }
    }

    // if valid save it to database
    database('todos').insert(todoData, 'id')
      .then(todo => {
        res.status(201).json({ id: todo[0] });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  });

// handling get, put and delete for specific todo item
router.route("/:id")
  // get specific todo item
  .get((req, res) => {
    database('todos').where('id', req.params.id).select()
      .then(todos => {
        if (todos.length === 1) {
          res.status(200).json(todos[0])
        } else {
          res.status(404).json({
            error: `Could not find todo with id "${req.params.id}"`
          });
        }
      });
  })

  // update specific todo item
  .put((req, res) => {
    database('todos').where('id', req.params.id).update(req.body, 'id')
      .then((todos) => {
        res.status(200).json(todos[0]);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })
  
  // delete specific todo item
  .delete((req, res) => {
    database('todos').where('id', req.params.id).del()
      .then(() => {
        res.status(200).json({ "deleted": "successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })

module.exports = router;