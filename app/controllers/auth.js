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
};

