const User = require('../models/user');
module.exports = (req, res) => {
	User.find({ name: req.body.name }, (err , user) => {
	if(err) {
		return res.status(500).json(err.message);
	}
		if(user) {
			return res.status(200).json({ success: true, email : user })
		}else {
			return res.status(400).json({ success: false, error : 'no user found' })
		}
	})
}