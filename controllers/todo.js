const router = require('express').Router();
const database  = require('../db');

// handling get and post request
router.route('/')
  // 
  .get((req, res) => {
    database('todos').select()
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  })

  .post((req, res) => {

  });

module.exports = router;