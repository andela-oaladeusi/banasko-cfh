'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const User = require('./../../../app/models/user');
chai.use(chaiHttp);
const should = chai.should;


describe('Login Authentication', () => {
  before(function (done) {
    const user = new User();
    user.name = 'test';
    user.username = 'testUser';
<<<<<<< 57d823946a2ee3df6d4f0d49d256fbb8658495df
    user.email = 'testUser@user.com';
=======
    user.email = 'testUser@user.com'
>>>>>>> Update tests to new User model
    user.password = 'testUser1';
    user.save(() => {
      done();
    });
  });
  after((done) => {
    User.remove({}, (err) => {
      if (err) {
        throw err;
      }
      done();
    });
  });
  describe('Login', () => {
    it('should return an error on the wrong username or password login',
      (done) => {
        const user = {
          email: 'testUser1@user.com',
          password: 'password'
        };
        chai.request(server)
          .post('/api/auth/login')
          .send(user)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.should.have.status(400);
            res.body.should.have.property('message');
            res.body.should.have.property('message')
              .eql('Invalid username or password');
            done();
          });
      });
  });

  it('should return JWT on successful login', (done)  => {
    const user = {
      name : 'test',
      username: 'testUser',
      email: 'testUser@user.com',
      password: 'testUser1'
    };

    chai.request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});