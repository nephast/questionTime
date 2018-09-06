const express = require('express');

const router = express.Router();
const { User, Question } = require('../models');

router.post('/',
async (req, res, next) => {
 //look for user in db
 try {
  const user = await User.findOne({ user_id: req.body.userId });
  req.user = user
  return next();
 } catch (e) {
   console.log({ error: e });
   res.status(500).json({ error: 'an error occured' })  
 }  
},
async (req, res, next) => {
  //check if user answer is correct
  try {
    const lastQuestionAskedToUser = req.user.last_question;
    const question = await Question.findOne({ question_id: lastQuestionAskedToUser });
    const userAnswer = req.body.intent.values[0].slot;
    const checkAnswer = question.answers.filter(answer => answer.answer_id === userAnswer);
    if ( checkAnswer[0].is_answer === true ) {
      await User.update(
        { user_id: req.user.user_id, 'questions.question_id': req.user.last_question},
        { '$set': { 'questions.$.answered': true } }
      )
      res.status(200).json({output: '<speak>That\'s right! Thanks for playing.</speak>'});
      return next();
    } 
    res.status(200).json({output: '<speak>Sorry, wring answer.</speak>'});
    return next();
  } catch (e) {
    console.log({ error: e });
   res.status(500).json({ error: 'an error occured' })  
  }
}
);

module.exports = router;
