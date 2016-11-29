'use strict';

const jwt = require('jsonwebtoken'),
  mongoose = require('mongoose'),
  config = require('../../config/env/all'),
  moment = require('moment'),
  User = mongoose.model('User');


exports.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user || !user.authenticate(body.password)) {
      return res.status('400').json({
        success: false,
        message: 'Auhentication failed. invalid details'
      });
    }
    const token = jwt.sign({
      user: user.email}, config.secret ,{
        expiresIn: moment().add(7, 'd').valueOf()
      });
    return res.status(200).json({
      success: true,
      message: 'login successfull',
      token: token,
    });
  });
};
