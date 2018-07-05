const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, (req, res) => {
  console.log(`listening to port: ${PORT}`);
});
