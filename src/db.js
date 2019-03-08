const mongoose = require('mongoose');

const db = {
	init: (dbUrl) => {
		mongoose.connect(dbUrl);

		let db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Connection error:'));
		db.once('open', function() {
		  console.log('Connected to MongoDB!');
		});
	}
};

export default db;
