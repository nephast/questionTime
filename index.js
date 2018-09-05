const express = require('express');
const bodyParser = require('body-parser');
const port = 4000;

require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./src/routes');

app.use('/api/v1/launch', routes.launch);

app.listen(port, () => {
  console.log(`SERVER RUNNING on ${port}`);
});
