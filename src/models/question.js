const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: 'question ID cannot be blank'
  },
  question: {
    type: String,
    required: 'no blank question please'
  },
  answers: [{
      answer_id: String,
      answer_text: String,
      is_answer: Boolean
    }],
  created_date: {
    type: Date,
    default: Date.now
  }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
