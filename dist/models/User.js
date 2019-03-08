'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getModel() {
	var userSchema = _mongoose2.default.Schema({
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		phone: { type: String },
		acceptedDocuments: { type: Boolean },

		created: { type: Date, default: Date.now
			// active: { type: Boolean, default: false }
		} });

	return _mongoose2.default.model('User', userSchema);
};

var User = getModel();

exports.default = User;