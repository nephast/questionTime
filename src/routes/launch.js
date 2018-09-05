const express = require('express');

const router = express.Router();
const { User, Question } = require('../models');

router.post('/', 
async (req, res, next) => {
 //select random question (for this demo only one question is available:)
 await Question.count().exec((err, count) => {
  let random = Math.floor(Math.random() * count)
  Question.findOne().skip(random).exec(
    (err, randomQuestion) => {
      req.question = randomQuestion;
      res.status(200).json({ here: randomQuestion })
      return next()
    })
}) 
});

module.exports = router;
