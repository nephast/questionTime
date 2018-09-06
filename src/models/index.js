const mongoose = require('mongoose');
const User = require('./user');
const Question = require('./question');

mongoose.set('debug', true);
mongoose.connect(process.env.DB, { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports = {
  User,
  Question
};
