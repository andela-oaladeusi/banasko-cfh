'use strict';
const User = require('../models/user');
module.exports = (req, res) => {
  const query = req.params.email;
  const limit = req.query.limit ? req.query.limit : 10;
  User.find({ email: { $regex: query } }).limit(limit)
    .exec((err, user) => {
      if (err) {
        return res.json(err);
      }
      return res.json(user);
    });
};