'use strict';


const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config/env/all');
const moment = require('moment');
const User = mongoose.model('User');


exports.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user || !user.authenticate(body.password)) {
      return res.status('400').json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    const token = jwt.sign({user: user.email},
      config.secret, { expiresIn: moment().add(7, 'd').valueOf()
      });
    return res.status(200).json({
      success: true,
      message: 'login successful',
      token: token,
    });
  });
};

exports.signUp = (req, res) => {

  User.findOne({
    email: email
  }, function (err, registeredUser) {
    if (err) {
      throw err;
    }

    if (!registeredUser) {
      if (name && email && username && pwd) {
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = pwd;
        user.avatar = avatar;

        user.save({
          function(err) {
            if (err) { throw err; }
            let jwttoken = jwt.sign(user, config.secret, { expiresInMinutes: 1440 });
            res.json({ success: true, message: 'Thank you for signing up!.', token: token });
          }
        });
      }
    } else if (user) {
      res.json({ message: 'Incomplete SignUp Details Provided.' });
    } else {
      res.json({ message: 'User already exists!' });
    }
  });
};
