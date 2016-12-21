'use strict';

/*
 * Module dependencies.
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../../../server');
const Records = require('./../../../app/models/records');
chai.use(chaiHttp);
const should = chai.should;

describe('Game Records', () => {

  describe('Verify that game records are stored for completed games', () => {
    const gameData = new Records();

    gameData.gameID = 'E31165';
    gameData.players = [{
      'hand': [],
      'points': 0,
      'username': 'femi',
      'avatar': '/img/chosen/FI02.png',
      'premium': 0,
      'socketID': '/#5LgGNSrps-g16zCDAAAG',
      'color': 0
    }, {
      'hand': [],
      'points': 0,
      'username': 'moyo',
      'avatar': '/img/chosen/N03.png',
      'premium': 0,
      'socketID': '/#za9E73CZuoLma3wtAAAH',
      'color': 1
    }, {
      'hand': [],
      'points': 0,
      'username': 'shalom',
      'avatar': '/img/chosen/E01.png',
      'premium': 0,
      'socketID': '/#isgbLIVsI5M2BTlfAAAB',
      'color': 2
    }];

    it('Test API connection on game start', (done) => {
      gameData.completed = false;
      gameData.rounds = 0;
      gameData.winner = ' ';
      chai.request(server)
        .post(`/api/games/${gameData.gameID}/start`)
        .send(gameData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message')
            .eql('Thanks for starting a game!');
          done();
        });
    });

    it('stores partial game record on game start', (done) => {
      gameData.completed = false;
      gameData.rounds = 0;
      gameData.winner = ' ';
      gameData.save((err, data) => {
        data.should.equal(gameData);
        done();
      });
    });

    it('Test API route for the end of the game', function (done) {
      gameData.completed = true;
      gameData.rounds = 4;
      gameData.winner = 'femi';
      chai.request(server)
        .post(`/api/games/${gameData.gameID}/end`)
        .send(gameData)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('updates game record at the end of the game', function (done) {
      gameData.completed = true;
      gameData.rounds = 4;
      gameData.winner = 'femi';

      gameData.update({
        gameID: gameData.gameID
      }, {
        $set: {
          completed: gameData.completed,
          rounds: gameData.rounds,
          winner: gameData.winner
        }
      }, (err, data) => {
        data.ok.should.equal(1);
        done();
      });
    });

    it('confirms relevant fields are updated', function (done) {
      Records.findOne({
        gameID: gameData.gameID
      }, (err, data) => {
        data.completed.should.equal(true);
        data.rounds.should.equal(4);
        data.winner.should.equal('femi');
        done();
      });
    });
  });
});
