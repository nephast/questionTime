const express = require('express');

const router = express.Router();
// const { User, Question } = require('../models');

router.post('/', 
async (req, res, next) => {
  res.status(200).json({hello: 'bonjour'});
  return next();
})

module.exports = router;
