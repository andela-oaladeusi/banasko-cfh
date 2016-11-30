'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const User = require('./../../../app/models/user');
chai.use(chaiHttp);
const should = chai.should;
const url = '/api/auth/signup';

describe('Signup Authentication', () => {
  it('verifies that signup fails for incomplete details', (done) => {
    const user = {
      name: 'user1',
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
        res.should.have.status(400);
        done();
      });
  });

  it('verifies password has a length of at least 8 characters', (done) => {
    const user = {
      name: 'user2',
      email: 'password@gmail.com',
      password: 'test',
      avatar: 'avatar10'
    };

    chai.request(server)
      .post(url)
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('Invalid details provided.');
        res.should.have.status(400);
        done();
      });
  });

  it('verifies that signup is sucessful', (done) => {
    const user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      username: 'andeReal',
      password: 'andela1!',
      avatar: 'andela1'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('Thank you for signing up!');
        res.body.should.have.property('token');
        res.should.have.status(201);
        done();
      });
  });


  it('ensures a user can not sign up more than once', (done) => {
    const user = {
      name: 'Andela',
      email: 'andela@yahoo.com',
      username: 'andeReal',
      password: 'andela1!',
      avatar: 'andela1'
    };

    chai.request(server)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body
          .should.have.property('message').eql('User already exists!');
        res.should.have.status(409);
        done();
      });
  });
});