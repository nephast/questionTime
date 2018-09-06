const { Question } = require('../models');

const QuestionControllers = {
  randomQuestion: async () => {
    try {
      const data = await Question.aggregate(
        [{ '$sample': { size: 1 } }]
     )
     return { err: null, data };
    } catch (e) {
      return { err: e, data: null }
    }
  },
  findLastQuestion: async (req) => {
    try {
      const data = await Question.findOne({ question_id: req.user.last_question})
      return { err: null, data }
    } catch (e) {
      return { err: e, data: null }
    }
  }
};

module.exports = QuestionControllers;
