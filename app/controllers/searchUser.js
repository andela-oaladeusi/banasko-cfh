'use strict';
const User = require('../models/user');
module.exports = (req, res) => {
<<<<<<< d0f73b5450a8c0b64b71826222c59c739ed88e50
  const query = req.params.email;
  User.find({ email: { $regex: query } }).limit(6)
    .exec((err, user) => {
      if (err) {
        return res.json(err);
      }
      return res.json(user);
    });
};
=======
	let query = req.params.email;
	User.find({ email: { $regex: query } }).limit(6)
		.exec(function (err, user) {
			if (err) {
				return res.json(err);
			}
			return res.json(user);
		});
};
>>>>>>> Add search api and updating files
