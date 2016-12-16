'use strict';

/*
 * Module dependencies.
 */
var mongoose = require('mongoose');
var GameRecords = mongoose.model('Records');

/*
 * Find Game Records by Gameid
 */
exports.getGameRecords = (req, res) => {
  var gameID = req.params.id;
  GameRecords.findOne({
    gameID: gameID
  }, (e, savedGame) => {
    if (e) {
      return res.send(e);
    }
    if (!savedGame) {
      return res.status(400).json({
        success: false,
        message: 'Game Record Not Found!!'
      });
    } else {
      return res.status(200).json(savedGame);
    }
  });
};

/*
 * Store Game Record
 */
exports.saveRecords = (req, res) => {
  var gameID = req.body.gameID;
  var players = req.body.players;
  var completed = req.body.completed;
  var winner = req.body.winner;
  var rounds = req.body.rounds;

  var gameRecord = new GameRecords({
      gameID,
    players,
     completed,
    rounds,
    winner
  });

  gameRecord.save((e, data) => {
    if (e {
      return res.send(e);
    }
    return res.status(201).json({
      success: true,
      data: data,
      message: 'Thanks for starting a game!'
    });
  });
};


/*
 * Update Game Record
 */

exports.updateRecords = (req, res) => {
  var gameID = req.body.gameID;
  var completed = req.body.completed;
  var winner = req.body.winner;
  var rounds = req.body.rounds;

  GameRecords.update({
    gameID: gameID
  }, {
    $set: {
      completed: completed,
      rounds: rounds,
      winner: winner
    }
  }, (e, data) => {
    if (err) {
      return res.send(e);
    }
    return res.status(201).json({
      success: true,
      message: 'Gamer Record updated',
      data: data
    });
  });
};
