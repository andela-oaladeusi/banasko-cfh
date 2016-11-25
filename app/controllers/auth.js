'use strict';

let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let config = require('../../config/config');
let User = mongoose.model('User');


module.exports.signUp = (req, res) => {

  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let avatar = req.body.avatar;

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
          function (err) {
            if (err) {
              throw err;
            }
            let jwttoken = jwt.sign(user, config.secret, {
              expiresInMinutes: 1440
            });
            res.json({
              success: true,
              message: 'Thank you for signing up!.',
              token: token
            });
          }
        });
      }
    } else if (user) {
      res.json({
        message: 'Incomplete SignUp Details Provided.'
      });
    } else {
      res.json({
        message: 'User already exists!'
      });
    }
  });
};


module.exports.login = (req, res) => {

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
    }
  });
}