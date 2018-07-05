const router = require('express').Router();
const todoController = require('./controllers/todo');

router.get('/', (req, res) => {
  res.json({
    app: "node apps"
  });
});

router.use('/todos', todoController);

module.exports = router;