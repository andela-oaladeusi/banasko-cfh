'use strict';
const User = require('../models/user');
module.exports = (req, res) => {
<<<<<<< 7fb0fa8838c4a611a3e4bb01e8ea67c68b3669a6
	const query = req.params.email;
	User.find({ email: { $regex: query } }).limit(6)
		.exec((err, user) => {
=======
	let query = req.params.email;
	User.find({ email: { $regex: query } }).limit(6)
		.exec(function (err, user) {
>>>>>>> Add search api and updating files
			if (err) {
				return res.json(err);
			}
			return res.json(user);
		});
};