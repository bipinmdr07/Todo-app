const express = require('express');
const routes = require('./routes');

const PORT = 3000;

const app = express();

app.use('/api', routes);

app.listen(PORT, (req, res) => {
  console.log(`listening to port: ${PORT}`);
});
