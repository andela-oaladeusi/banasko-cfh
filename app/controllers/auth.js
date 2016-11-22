'use strict';


const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config/env/all');
const moment = require('moment');
const User = mongoose.model('User');

<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6

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
=======
module.exports.signUp = (req, res) => {
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let pwd = req.body.password;
  let avatar = req.body.avatar;
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature

  User.findOne({
    email: email
  }, function (err, registeredUser) {
    if (err) {
      throw err;
    }
    console.log(registeredUser)
    if (!registeredUser) {
      if (name && email  && pwd) {
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = pwd;
        user.avatar = avatar;

        user.save(function(err) {
            if (err) { throw err; }
            let token = jwt.sign({user: user, iat: 1440 }, config.secret );
            return res.json({ success: true, message: 'Thank you for signing up!.', token: token });
          });
      }else{
         return res.json({ message: 'Incomplete SignUp Details Provided.' });
      }

    }else{
      return res.json({ message: 'User already exists!' });
    }
<<<<<<< 59bb706c221d8bbf512b7c06573d4430371886f6
  });
};
=======

  });
}

module.exports.login = (req, res) => {
   let email = req.body.email;
   let pwd = req.body.password;

  User.findOne({
    email: email
  }, function (err, savedUser) {
    if (err) {
      res.send(err);
    }

    if (!savedUser) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (savedUser) {
      if (!savedUser.authenticate(pwd)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign({email: email, iat: 1440 }, config.secret);

        res.json({
          success: true,
          message: 'Sucessful Login!',
          token: token
        });
      }

    }

  })

}
>>>>>>> feature(jwt_tokens): integrate signup with jwt token feature
