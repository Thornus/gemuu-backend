'use strict';

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _session = require('../session');

var _session2 = _interopRequireDefault(_session);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function postRegistration(req, res) {
	var userData = req.body;

	var existingUser = await _User2.default.findOne({ username: userData.username });
	if (existingUser && userData.username === existingUser.username) {
		res.status(400).send({ error: 'usernameAlreadyTaken' });
		throw 'usernameAlreadyTaken';
	}

	if (userData.password && userData.password !== userData.passwordConfirm) {
		res.status(400).send({ error: 'passwordsMustMatch' });
		throw 'passwordsMustMatch';
	}

	userData.password = await _bcrypt2.default.hash(userData.password, 10);

	var user = new _User2.default(userData);

	try {
		user.save();
	} catch (e) {
		console.log('Error saving user to the db:', e);
	}

	res.status(200).send({});
}

module.exports = { postRegistration: postRegistration };