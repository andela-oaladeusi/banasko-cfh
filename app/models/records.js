'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * Game Record Schema
 */
const RecordSchema = new Schema({
  gameID: String,
  gameCreator: String,
  players: [],
  completed: Boolean,
  rounds: Number,
  winner: String,
  gameDate: String,
  gameStartedAt: String
});

module.exports = mongoose.model('Records', RecordSchema);
