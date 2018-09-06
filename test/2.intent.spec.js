process.env.NODE_ENV = 'test';
process.env.DB = 'mongodb://localhost/when-in-rome';

const { User, Question } = require('../src/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('..');
const expect = chai.expect;

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

const questionPayload = {
	"question_id": "abcd",
	"question": "Which of these is the largest?",
	"answers": [
			{
				"answer_id": "a", 
				"answer_text": "A. a tennis ball", 
				"is_answer": false
			},
			{
				"answer_id": "b",
				"answer_text": "B. a bowling ball",
				"is_answer": false
      },
      {
				"answer_id": "c",
				"answer_text": "C. a house",
				"is_answer": false
      },
      {
				"answer_id": "d",
				"answer_text": "D. the sun",
				"is_answer": true
      }
		]
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
    before(async () => {
      await User.collection.drop();
      await Question.collection.drop();
      await User.create(userPayload);
      await Question.create(questionPayload);
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
  })
});
