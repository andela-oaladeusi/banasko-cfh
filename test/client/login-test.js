const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../server');
const User = require('./../../app/models/user');

chai.use(chaiHttp);
const should = chai.should();


describe('Authentication', () => {
  beforeEach(function (done) {
    let user = new User();
    user.username = 'testUser';
    user.password = 'testUser1';
    user.save(() => {
      done();
    });
  });
  afterEach((done) => {
    User.remove({}, (err) => {
      if(err) throw err
      done()
    });
  })
  describe('Login', () => {
    it('should return an error on the wrong username or password login', (done) => {
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
            res.body.should.have.property('message').eql('Authentication failed. User not found.');
            done();
          });
      });
  });

  it('should return JWT on successful login',  (done) => {
    let user = {
      username: 'testUser',
      password: 'testUser1'
    };

    chai.request(server)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        console.log(res.body);
        res.body.should.have.property('token');
        done();
      });
  });
});