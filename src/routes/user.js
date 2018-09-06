const express = require('express');

const router = express.Router();
const { User } = require('../models');

router.post('/', async (req, res, next) => {
  const createUser = await User.create(req.body)
  return next(res.status(201).json({ created: createUser }))
})

module.exports = router;
