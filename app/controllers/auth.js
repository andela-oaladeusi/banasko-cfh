'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moments = require('moment');
const config = require('../../config/config');
const validate = require('validator');
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
          !validate.isAlpha(name)) {
          res.status(400).json({
            success: false,
            message: 'Invalid details provided.'
          });
        } else {
          let user = new User({
            name: name,
            username: username,
            email: email,
            password: pwd,
            avatar: avatar
          });

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
          success: false,
          message: 'Incomplete SignUp Details Provided.'
        });
      }
    } else {
      res.status(409).json({
        success: false,
        message: 'User already exists!'
      });
    }
  });
};

exports.login = (req, res) => {
  const body = req.body;
  User.findOne({
    email: body.email
  }, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user || !user.authenticate(body.password)) {
      return res.status('400').json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    const token = jwt.sign({
        user: user.email
      },
      config.secret, {
        expiresIn: moments().add(7, 'd').valueOf()
      });
    return res.status(200).json({
      success: true,
      message: 'login successful',
      token: token,
    });
  });
};