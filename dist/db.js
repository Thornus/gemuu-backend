'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var mongoose = require('mongoose');

var db = {
	init: function init(dbUrl) {
		mongoose.connect(dbUrl);

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Connection error:'));
		db.once('open', function () {
			console.log('Connected to MongoDB!');
		});
	}
};

exports.default = db;