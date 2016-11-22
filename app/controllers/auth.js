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