const { User } = require('../models');

const UserControllers = {
  UpdateLastQuestion: async (req, res, next) => {
    try {
      const data = await User.update(
        { user_id: req.body.userId },
        { '$set': { 'last_question': req.question.question_id } }
      )
      return { err: null, data}
    } catch (e) {
      return { err: e, data: null }
    }
  },
  addQuestionToUser: async (req, res, next) => {
    try {
      const data = await User.update(
        { user_id: req.body.userId, 'questions.question_id': { $ne: req.question.question_id }  },
        { '$push': { 'questions' : { 'question_id': req.question.question_id, 'answered': false, lastOne: true } } }
      )
      return { err: null, data }
    } catch (e) {
      return { err: e, data: null }
    }
  },
  findAnsweredQuestion: async (req) => {
    try {
      const data = await User.find(
        { user_id: req.body.userId, questions: { '$elemMatch': { 'question_id': req.question.question_id, answered: true } } }
      )
      return { err: null, data }
    } catch (e) {
      return { err: e, data: null }
    }
  },
  findUser: async (req) => {
    try {
      const data = await User.findOne({ user_id: req.body.userId })
      return { err: null, data}
    } catch (e) {
      return { err: e, data: null }
    }
  },
  updateAnsweredQuestion: async (req) => {
    try {
      const data = await User.update(
        { user_id: req.user.user_id, 'questions.question_id': req.user.last_question},
        { '$set': { 'questions.$.answered': true } }
      )
      return { err: null, data }
    } catch (e) {
      return { err: e, data: null }
    }
  }
};

module.exports = UserControllers;
