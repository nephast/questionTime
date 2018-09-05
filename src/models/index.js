const mongoose = require('mongoose');
const User = require('./user');
// const Question = require('./question');

mongoose.set('debug', true);
mongoose.connect(process.env.DB);

mongoose.Promise = Promise;

module.exports = {
  User,
  // Question
};
