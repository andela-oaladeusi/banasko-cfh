'use strict';

const chai = require('chai');
const User = require('./../../app/models/user');
const chaiHttp = require('chai-http');
const server = require('./../../server');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const url = '/api/auth/signup';

describe('Signup', () => {
  it('verifies that signup fails for incomplete details', (done) => {
    const user = {
      name: 'user1',
      username: 'testUser',
      email: '',
      password: 'testing1',
      avatar: ''
    };

    chai.request(server)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('Incomplete SignUp Details Provided.');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('verifies password has a length of at least 5', (done) => {
    const user = {
      name: 'user2',
      email: 'password@gmail.com',
      username: 'passwordUser',
      password: 'test',
      avatar: 'avatar10'
    };

    chai.request(server)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('Invalid password provided.');
        expect(res).to.have.status(400);
        done();
      });
  });

  it('verifies that signup is sucessful', (done) => {
    const user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      username: 'andelan',
      password: '12345',
      avatar: 'andela1'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('Thank you for signing up!');
        expect(typeof res.body.token).to.equal('string');
        expect(res)
          .to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res).to.have.status(201);
        done();
      });
  });


  it('ensures a user can not sign up more than once', (done) => {
    const user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      username: 'andelan',
      password: '12345',
      avatar: 'andela1'
    };


    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.body.message).to.equal('User already exists!');
        expect(res)
          .to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res).to.have.status(409);
        done();
      });
  });
});