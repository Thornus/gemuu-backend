'use strict';

var _Interest = require('../models/Interest');

var _Interest2 = _interopRequireDefault(_Interest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getInterests(req, res) {
	var interests = await _Interest2.default.find();
	res.send({ interests: interests });
}

module.exports = { getInterests: getInterests };