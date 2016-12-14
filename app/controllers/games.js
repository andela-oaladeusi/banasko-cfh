'use strict';

/*
 * Module dependencies.
 */
const mongoose = require('mongoose');
const GameRecords = mongoose.model('Records');

/*
 * Find Game Records by Gameid
 */
exports.getGameRecords = (req, res) => {
  const gameID = req.params.id;
  GameRecords.findOne({
    gameID: gameID
  }, (err, savedGame) => {
    if (err) {
      return res.send(err);
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
  const gameID = req.body.gameID;
  const players = req.body.players;
  const completed = req.body.completed;
  const winner = req.body.winner;
  const rounds = req.body.rounds;

  const gameRecord = new GameRecords({
    gameID,
    players,
    completed,
    rounds,
    winner
  });

  gameRecord.save((err, data) => {
    if (err) {
      return res.send(err);
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
  const gameID = req.body.gameID;
  const completed = req.body.completed;
  const winner = req.body.winner;
  const rounds = req.body.rounds;

  GameRecords.update({
    gameID: gameID
  }, {
    $set: {
      completed: completed,
      rounds: rounds,
      winner: winner
    }
  }, (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.status(201).json({
      success: true,
      message: 'Gamer Record updated',
      data: data
    });
  });
};
