'use strict';

const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../../config/config'),
  User = mongoose.model('User');


module.exports.signUp = (req, res) => {
  const name = req.body.name,
    username = req.body.username,
    email = req.body.email,
    pwd = req.body.password,
    avatar = req.body.avatar;

  User.findOne({
    email: email
  }, function (err, registeredUser) {
    if (err) {
      throw err;
    }
    console.log(registeredUser)
    if (!registeredUser) {
      if (name && email && pwd) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = pwd;
        user.avatar = avatar;

        user.save(function (err) {
          if (err) { throw err; }
          const token = jwt.sign({ user: user, iat: 1440 }, config.secret);
          return res.status(201).json({ success: true, message: 'Thank you for signing up!.', token: token });
        });
      } else {
        return res.status(400).json({ message: 'Incomplete SignUp Details Provided.' });
      }
    } else {
      return res.status(409).json({ message: 'User already exists!' });
    }
  });
}

module.exports.login = (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;

  User.findOne({
    email: email
  }, function (err, savedUser) {
    if (err) {
      res.send(err);
    }
    if (!savedUser) {
      res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (savedUser) {
      if (!savedUser.authenticate(pwd)) {
        res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign({ email: email, iat: 1440 }, config.secret);
        res.json({
          success: true,
          message: 'Sucessful Login!',
          token: token
        });
      }
    }
  })
}