const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./src/routes');

app.use('/api/v1/launch', routes.launch);
app.use('/api/v1/intent', routes.intent);
app.use('/api/v1/user', routes.user);
app.use('/api/v1/question', routes.question);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING on ${PORT}`);
});
