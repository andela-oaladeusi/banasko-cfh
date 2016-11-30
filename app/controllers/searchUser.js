'use strict';
const User = require('../models/user');
module.exports = (req, res) => {
	let query = req.params.email;
	User.find({ email: { $regex: query } }).limit(6)
		.exec(function (err, user) {
			if (err) {
				return res.json(err);
			}
			return res.json(user);
		});
};
