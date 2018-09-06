const express = require('express');

const router = express.Router();
const { UserControllers, QuestionControllers } = require('../controllers');
const helpers = require('../helpers');

router.post('/', 
async (req, res, next) => {
 //select random question (for this demo only one question is available:)
const { err: randomQuestionErr, data: randomQuestion } =  await QuestionControllers.randomQuestion();
if (randomQuestionErr) {
  const error = new Error();
  return next(error)
}
  req.question = randomQuestion[0];
  return next();
},

async (req, res, next) => {
  // add question obj to array of questions if not already there
  const { err: addQuestionErr } = await UserControllers.addQuestionToUser(req, res, next);
  if (addQuestionErr) {
    const error = new Error();
    res.status(500).json({ error: 'Something went wrong' });
    return next(error);
  }

   // update last question asked so we know later on which one to match the user answer
  const { err: updatedQuestionErr, data: updatedQuestion } = await UserControllers.UpdateLastQuestion(req, res, next);
  if (updatedQuestionErr) {
    const error = new Error();
    res.status(500).json({ error: 'Something went wrong' });
    return next(error);
  }

  //check if user has already answered this question
    const { err: alreadyAnsweredErr, data: alreadyAnswered } = await UserControllers.findAnsweredQuestion(req);
    if (alreadyAnsweredErr) {
      const error = new Error();
      res.status(500).json({ error: 'Something went wrong' });
      return next(error);
    }
      if (alreadyAnswered.length === 0) {
        const answers = helpers.buildAnswers(req)
        res.status(200).json({ output: `<speak>Welcome to Question Time! ${req.question.question} ${answers}</speak>` })
        return next();
      }
      res.status(200).json({ output: '<speak>Welcome back to Question Time! Sorry, but you\'ve already answered the question</speak>' })
      return next();
} 
);

module.exports = router;
