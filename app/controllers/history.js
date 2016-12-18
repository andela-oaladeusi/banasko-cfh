'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const GameRecords = mongoose.model('Records');

/**
 * Get All Game Records for a User.
 */
exports.getUserHistory = (req, res) => {
  const username = req.body.username;
  GameRecords.find({
    $or: [{
      gameCreator: username
    }, {
      players: {
        $elemMatch: {
          username: username
        }
      }
    }]
  }, (err, history) => {
    if (err) {
      return res.send(err);
    }
    if (!history || Object.keys(history).length < 1) {
      return res.status(400).json({
        success: false,
        message: 'You have no Game Records yet!!'
      });
    } else {
      return res.status(200).json(history);
    }
  });
};
