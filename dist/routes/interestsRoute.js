'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _interestsController = require('../controllers/interestsController');

var interestsRoute = {
	init: function init(app) {
		app.get('/interests', _interestsController.getInterests);
	}
};

exports.default = interestsRoute;