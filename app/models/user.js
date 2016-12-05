'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs'),
  _ = require('underscore'),
  authTypes = ['github', 'twitter', 'facebook', 'google'];
=======
	Schema = mongoose.Schema,
	bcrypt = require('bcryptjs'),
	_ = require('underscore'),
	authTypes = ['github', 'twitter', 'facebook', 'google'];
>>>>>>> Remove unnecessary console.log


/**
 * User Schema
 */
var UserSchema = new Schema({
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  name: String,
  email: String,
  username: String,
  provider: String,
  avatar: String,
  premium: Number, // null or 0 for non-donors, 1 for everyone else (for now)
  donations: [],
  hashed_password: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
=======
	name: String,
	email: String,
	username: String,
	provider: String,
	avatar: String,
	premium: Number, // null or 0 for non-donors, 1 for everyone else (for now)
	donations: [],
	hashed_password: String,
	facebook: {},
	twitter: {},
	github: {},
	google: {}
>>>>>>> Remove unnecessary console.log
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function (password) {
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  this._password = password;
  this.hashed_password = this.encryptPassword(password);
}).get(function () {
  return this._password;
=======
	this._password = password;
	this.hashed_password = this.encryptPassword(password);
}).get(function () {
	return this._password;
>>>>>>> Remove unnecessary console.log
});

/**
 * Validations
 */
var validatePresenceOf = function (value) {
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  return value && value.length;
=======
	return value && value.length;
>>>>>>> Remove unnecessary console.log
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function (name) {
	// if you are authenticating by any of the oauth strategies, don't validate
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return name.length;
=======
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return name.length;
>>>>>>> Remove unnecessary console.log
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
	// if you are authenticating by any of the oauth strategies, don't validate
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return email.length;
=======
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return email.length;
>>>>>>> Remove unnecessary console.log
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
	// if you are authenticating by any of the oauth strategies, don't validate
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return username.length;
=======
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return username.length;
>>>>>>> Remove unnecessary console.log
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
	// if you are authenticating by any of the oauth strategies, don't validate
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return hashed_password.length;
=======
	if (authTypes.indexOf(this.provider) !== -1) return true;
	return hashed_password.length;
>>>>>>> Remove unnecessary console.log
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
    next(new Error('Invalid password'));
  else
    next();
=======
	if (!this.isNew) return next();

	if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
		next(new Error('Invalid password'));
	else
		next();
>>>>>>> Remove unnecessary console.log
});

/**
 * Methods
 */
UserSchema.methods = {
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
  */
  authenticate: function (plainText) {
    if (!plainText || !this.hashed_password) {
      return false;
    }
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
=======
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function (plainText) {
		if (!plainText || !this.hashed_password) {
			return false;
		}
		return bcrypt.compareSync(plainText, this.hashed_password);
	},
>>>>>>> Remove unnecessary console.log

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
<<<<<<< 09fbbbbebee38dc0e61c433b1491e36074651d17
  encryptPassword: function (password) {
    if (!password) return '';
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
=======
	encryptPassword: function (password) {
		if (!password) return '';
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	}
>>>>>>> Remove unnecessary console.log
};

module.exports = mongoose.model('User', UserSchema);
