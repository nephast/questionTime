const buildAnswers = (req) => {
  let answers = '';
  const lastAnswer = req.question.answers.pop();
  req.question.answers.forEach(answer => {
    answers+=`${answer.answer_text}, `
  });
  return answers+=`or ${lastAnswer.answer_text}`
};

module.exports = {
  buildAnswers
};
