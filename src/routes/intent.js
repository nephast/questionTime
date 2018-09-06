const express = require('express');

const router = express.Router();
const { UserControllers, QuestionControllers } = require('../controllers');

router.post('/',
async (req, res, next) => {
 //look for user in db
const { err: errUser, data: user} = await UserControllers.findUser(req);
if (errUser) {
  const error = new Error();
  res.status(500).json({ error: 'Something went wrong' });
  return next(error);
}
req.user = user;
return next();
},
async (req, res, next) => {
  //check if user's answer is correct
  try {
    const { err: questionErr, data: question } = await QuestionControllers.findLastQuestion(req)
    if (questionErr) {
      const error = new Error();
      res.status(500).json({ error: 'Something went wrong' });
      return next(error)
    } 
    const userAnswer = req.body.intent.values[0].slot;
    const checkAnswer = question.answers.filter(answer => answer.answer_id === userAnswer);
    if ( checkAnswer[0].is_answer === true ) {
      const {err: questionAnsweredErr, data: questionAnswered} = await UserControllers.updateAnsweredQuestion(req);
      if (questionAnsweredErr) {
        const error = new Error();
        res.status(500).json({ error: 'Something went wrong' });
        return next(error)
      }
      res.status(201).json({output: '<speak>That\'s right! Thanks for playing.</speak>'});
      return next();
    } 
    res.status(200).json({output: '<speak>Sorry, wrong answer.</speak>'});
    return next();
  } catch (e) {
    console.log({ error: e });
   res.status(500).json({ error: 'Something went wrong' })  
  }
}
);

module.exports = router;
