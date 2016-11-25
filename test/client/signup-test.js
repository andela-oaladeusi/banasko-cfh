const mongoose = require('mongoose');
const chai = require('chai');
const User = require('./../../app/models/user');
const chaiHttp = require('chai-http');
const server = require('./../../server');
chai.use(chaiHttp);
const should = chai.should();
const url = '/api/auth/signup';

describe('Registration_Signup', () => {
  describe('Incomplete User Details', () => {
    it('should verify that signup fails when incomplete details are provided', (done) => {
      let json = {
        name: 'testUser',
        email: '',
        password: '',
        avatar: 'avatar01'
      };
      chai.request(server)
        .post(url)
        .send(json)
        .end((err, res) => {
// res.body.should.have.property('message').eql('Incomplete SignUp Details Provided.');

// res.body.should.have.property('message').eql('Incomplete SignUp Details Provided.');
          //expect(res).to.have.header('content-type', 'application/json');
         // expect(res.body.message).to.equal('Incomplete SignUp Details Provided.');
          done();
        });
    });
  });

});