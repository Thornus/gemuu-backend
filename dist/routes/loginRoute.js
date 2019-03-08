'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loginController = require('../controllers/loginController');

var loginRoute = {
	init: function init(app) {
		app.post('/login', _loginController.postLogin);
	}
};

exports.default = loginRoute;