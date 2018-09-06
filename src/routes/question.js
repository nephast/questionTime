const express = require('express');

const router = express.Router();
const { Questions } = require('../models');

router.post('/', async (req, res, next) => {
  const createQuestion = await Questions.create(req.body)
  return next(res.status(201).json({ created: createQuestion }));
})

module.exports = router;
