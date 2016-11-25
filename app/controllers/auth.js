'use strict';
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config/env/all');
const moment = require('moment');
const User = mongoose.model('User');

exports.signUp = (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;
  const avatar = req.body.avatar;

  User.findOne({
    email: email
  }, function (err, registerUser) {
    if (err) {
      res.send(err);
    }

    if (!registerUser) {
      if (name && email && pwd) {
        if ((pwd.trim().length) < 8 || !validate.isEmail(email) ||
          !validate.isAlpha(name) || !validate.isAlphanumeric(username)) {
          res.status(400).json({
            message: 'Invalid details provided.'
          });
        } else {
          let user = new User();
          user.name = name;
          user.username = username;
          user.email = email;
          user.password = pwd;
          user.avatar = avatar;

          user.save((err, saveUser) => {
            if (err) {
              res.send(err);
            }
            let token = jwt.sign({
              userId: saveUser._id,
              expiresInMinutes: moments().day(7)
            }, config.secret);
            res.status(201).json({
              success: true,
              message: 'Thank you for signing up!',
              token: token
            });
          });
        }
      } else {
        res.status(400).json({
          message: 'Incomplete SignUp Details Provided.'
        });
      }
    }


exports.login = (req, res) => {

  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let avatar = req.body.avatar;

  User.findOne({
    username: username
  }, function (err, savedUser) {
    if (err) {
      res.send(err);
    }
    if (!savedUser) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (savedUser) {
      if (!savedUser.authenticate(pwd)) {
        console.log(savedUser);
        console.log("Saved password: " + savedUser.password);
        console.log("User password: " + pwd)
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        var token = jwt.sign({
          savedUser,
          expiresInMinutes: 1440
        }, config.secret);
        res.json({
          success: true,
          message: 'Sucessful Login!',
          token: token
        });
      }
    } else {
      res.status(409).json({
        message: 'User already exists!'
      });
    }
  });
};
}
