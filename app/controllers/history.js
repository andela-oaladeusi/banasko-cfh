'use strict';

/*
 * Module dependencies.
 */
const mongoose = require('mongoose');
const GameRecords = mongoose.model('Records');

/*
 * Get All Game Records for a User.
 */
exports.getUserHistory = (req, res) => {
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
