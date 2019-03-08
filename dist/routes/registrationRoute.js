'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _registrationController = require('../controllers/registrationController');

var registrationController = {
	init: function init(app) {
		app.post('/registration', _registrationController.postRegistration);
	}
};

exports.default = registrationController;