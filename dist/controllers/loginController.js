'use strict';

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _session = require('../session');

var _session2 = _interopRequireDefault(_session);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function postLogin(req, res) {
	var userData = req.body;

	if (!userData.username || !userData.password) {
		return res.status(400).send('Invalid request data.');
	}

	var user = await _User2.default.findOne({ username: userData.username });

	if (user) {
		_bcrypt2.default.compare(userData.password, user.password, async function (err, result) {
			if (!result) {
				return res.status(401).send({ message: 'Wrong username or password.' });
			}

			var token = _jsonwebtoken2.default.sign(user.password, ')>=B`9hK`k=UxJm@');
			user.token = token;

			await user.save();
			res.send({ token: token });

			_session2.default.sessionToken = token;
		});
	} else {
		return res.status(401).send({ message: 'Wrong username or password.' });
	}
}

module.exports = { postLogin: postLogin };