'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moments = require('moment');
const config = require('../../config/config');
const validate = require('validator');
const User = mongoose.model('User');


const errorHandler = (res, message, status) => {
  return res.status(status).json({
    success: false,
    message: message
  });
};

exports.signUp = (req, res) => {
  const body = req.body;
  if (body.username && body.name && body.password && body.email) {
    if ((body.password.trim().length >= 8) && validate.isEmail(body.email) &&
      validate.isAlpha(body.username) && !validate.isEmpty(body.name)) {
      let user = new User({
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password,
        avatar: body.avatar
      });
      user.save((err, saveUser) => {
        if (err) {
          if ((err.err).includes('username')) {
            errorHandler(res, 'This username already exists!', 409);
          } else if ((err.err).includes('email')) {
            errorHandler(res, 'This email already exists!', 409);
          } else {
            errorHandler(res, 'Unable to identify error source', 400);
          }
        } else {
          let token = jwt.sign({
            userId: saveUser._id,
            expiresInMinutes: moments().day(7)
          }, config.secret);
          res.status(201).json({
            success: true,
            message: 'Thank you for signing up!',
            token: token
          });
        }
      });
    } else {
      errorHandler(res, 'Email, Username & Password and Name required', 400);
    }
  } else {
    errorHandler(res, 'Email, Username & Password and Name required', 400);
  }
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