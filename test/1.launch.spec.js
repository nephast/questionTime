process.env.NODE_ENV = 'test';
process.env.DB = 'mongodb://localhost/when-in-rome';

const { User } = require('../src/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('..');
const expect = chai.expect;

chai.use(chaiHttp);

const questionOutput = "<speak>Welcome to Question Time! Which of these is the largest? A. a tennis ball, B. a bowling ball, C. a house, or D. the sun</speak>";
const sorryOutput = "<speak>Welcome back to Question Time! Sorry, but you've already answered the question.</speak>"

const launchPayload = {
	"type": "LaunchRequest",
	"userId": "1234"
};

const userPayloadNoAnswer = {
    "user_id": "1234",
    "questions": [{
      "question_id": "abcd",
      "answered": false
    }
    ]
};

const userPayloadWithAnswer = {
  "user_id": "1234",
  "questions": [{
    "question_id": "abcd",
    "answered": true
  }
  ]
}


describe('Launch Request', () => {
  describe('/POST LAUNCH when player has NOT yet answer the question', async () => {
    before(async () => {
      await User.collection.drop();
      await User.create(userPayloadNoAnswer);
    });
    it('should post a launch request and return the question', () => {
      return chai.request(server)
        .post('/api/v1/launch')
        .send(launchPayload) 
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.output).to.be.equal(questionOutput);
    })
  });
}),

describe('POST LAUNCH when player has answered the question', async () => {
  before(async () => {
    await User.collection.drop();
    await User.create(userPayloadWithAnswer);
  });
  it('it should post a launch request and return output saying question has been answered already', () => {
    return chai.request(server)
      .post('/api/v1/launch')
      .send(launchPayload)
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.output).to.be.equal(sorryOutput);
      })
  })
  // after((done) => {
  //   User.collection.drop();
  //   return done();
  // })
})
});
