const express = require('express');

const router = express.Router();
const { User, Question } = require('../models');

router.post('/', 
async (req, res, next) => {
 //select random question (for this demo only one question is available:)
 try {
  await Question.count().exec((err, count) => {
    let random = Math.floor(Math.random() * count)
    Question.findOne().skip(random).exec(
      (err, randomQuestion) => {
        if (err) {
          console.log({ error: err })
          res.status(500).json({ error: 'an error occured' })
        }
        req.question = randomQuestion;
        return next()
      })
  }) 
 } catch (e) {
  console.log({ error: e })
  res.status(500).json({ error: 'an error occured' })
 }
},

async (req, res, next) => {
  // add question obj to array of questions if not already there
  try {
    await User.update(
      { user_id: req.body.userId, 'questions.question_id': { $ne: req.question.question_id }  },
      { '$push': { 'questions' : { 'question_id': req.question.question_id, 'answered': false, lastOne: true } } }
    );
  } catch (e) {
    console.log({ error: e })
    res.status(500).json({ error: 'an error occured' })
  }

   // update last question asked so we know later on which one to match the user answer
  try {
    await User.update(
       { user_id: req.body.userId },
       { '$set': { 'last_question': req.question.question_id } }
     );
   } catch (e) {
    console.log({ error: e })
    res.status(500).json({ error: 'an error occured' })
   };

  //check if user has already answered this question
  try {
    const alreadyAnswered = await User.find(
      { user_id: req.body.userId, questions: { '$elemMatch': { 'question_id': req.question.question_id, answered: true } } }
    );
      if (alreadyAnswered.length === 0) {
        //create output answers for question
        let answers = '';
        const lastAnswer = req.question.answers.pop();
        req.question.answers.forEach(answer => {
          answers+=`${answer.answer_text}, `
        });
        answers+=`or ${lastAnswer.answer_text}`
        res.status(200).json({ output: `<speak>Welcome to Question Time! ${req.question.question} ${answers}</speak>` })
        return next();
      } else
      res.status(200).json({ output: '<speak>Welcome back to Question Time! Sorry, but you\'ve already answered the question</speak>' })
      return next();
  } catch (e) {
    console.log({ error: e })
    res.status(500).json({ error: 'an error occured' })
  } 
}
);

module.exports = router;
