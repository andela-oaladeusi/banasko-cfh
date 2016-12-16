'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Game Record Schema
 */
const HistorySchema = new Schema({
  gameID: String,
  players: [],
  completed: Boolean,
  rounds: Number,
  winner: String
});

module.exports = mongoose.model('History', HistorySchema);
