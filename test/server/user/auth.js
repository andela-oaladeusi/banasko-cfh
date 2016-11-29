'use strict';

const chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../../server'),
  User = require('./../../../app/models/user');

chai.use(chaiHttp);
const should = chai.should;


describe('Login Authentication', () => {
  before(function (done) {
    let user = new User();
    user.username = 'testUser@user.com';
    user.password = 'testUser1';
    user.save(() => {
      done();
    });
  });
  after((done) => {
    User.remove({}, (err) => {
      if(err) {
        throw err;
      }
      done();
    });
  });
  describe('Login', () => {
    it('should return an error on the wrong username or password login',
      (done) => {
        let user = {
          username: 'user1',
          password: 'password'
        };

        chai.request(server)
          .post('/api/auth/login')
          .send(user)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message')
              .eql('Auhentication failed. invalid details');
            done();
          });
      });
  });

  it('should return JWT on successful login', function (done) {
    let user = {
      username: 'testUser@user.com',
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