const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: 'user ID cannot be blank'
  },
  last_question: {
    type: String
  },
  questions: [{
    question_id: String,
    answered: {
      type: Boolean,
      default: false
    },
    _id: false
  }],
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
