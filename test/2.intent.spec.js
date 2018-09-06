process.env.NODE_ENV = 'test';
process.env.DB = 'mongodb://localhost/when-in-rome';

let { User, Question } = require('../src/models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('..');
let expect = chai.expect;

const intentOutput = "<speak>That's right! Thanks for playing.</speak>"
const intentPayload = { 
	"userId": "1234",
	"type": "IntentRequest",
	"intent": 
	{ "values":
		[
			{ 
			"locale": "en_US",
			"type": "answer",
			"slot": "d" 
			}
		] 	
	}
};

const userPayload = {
  "user_id": "1234",
  "questions": [{
    "question_id": "abcd",
    "answered": false
  }],
  "last_question": "abcd"
};

chai.use(chaiHttp);

describe('Intent Request', () => {
  describe('/POST INTENT when player gave correct answer', async () => {
    before((done) => {
      User.collection.drop();
      User.create(userPayload);
      return done();
    });
    it('should post an intent request with correct answer to the question', () => {
      return chai.request(server)
        .post('/api/v1/intent')
        .send(intentPayload)
        .then(res => {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.output).to.be.equal(intentOutput);
        })
    });
    after((done) => {
      User.collection.drop();
      return done();
    })
  })
});
