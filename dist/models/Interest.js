'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getModel() {
	var interestSchema = _mongoose2.default.Schema({
		name: { type: String, required: true },
		followers: { type: Number, required: true },
		imgPath: { type: String, required: true },

		created: { type: Date, default: Date.now }
	});

	return _mongoose2.default.model('Interest', interestSchema);
};

var Interest = getModel();

exports.default = Interest;