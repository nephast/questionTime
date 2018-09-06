const launchRoute = require('./launch');
const intentRoute = require('./intent');
const userRoute = require('./user');
const questionRoute = require('./question');

module.exports = {
  launch: launchRoute,
  intent: intentRoute,
  user: userRoute,
  question: questionRoute
};
