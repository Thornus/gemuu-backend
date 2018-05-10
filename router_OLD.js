const {models} = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('./session');

let Booking = models.Booking();
let User = models.User();

const router = {
	post: (app) => {
		app.post('/bookings', (req, res) => {
			let booking = new Booking(req.body);

			booking.save().then((booking) => {
				res.send(`Inserted:\n${JSON.stringify(booking)}`);
			}).catch((err) => {
				res.send(err);
			});
		});

		app.post('/register', (req, res) => {
			let user = new User(req.body);

			User.findOne({email: user.email}).then((user) => {
				if (user) {
					res.send({message: `A user with that email is already registered!`});
					return;
				}
			});

			bcrypt.hash(user.password, 10, function (err, hash) {
				user.password = hash;

				if (err) {
					res.send(err);
				}

				user.save().then(() => {
					res.send({message: `You registered successfully!`});
				}).catch((err) => {
					res.send(err);
				});

			});
		});

		app.post('/login', (req, res) => {
			let userData = req.body;
			if (!userData.username || !userData.password) {
				res.send('Invalid request data.');
			}

			User.findOne({username: userData.username})
				.then((user) => {

					bcrypt.compare(userData.password, user.password, function (err, result) {
						if (!result) {
							res.send({message: 'Wrong username or password.'});
							return;
						}

						let token = jwt.sign(user.password, 'secret');
						user.token = token;
						user.save()
							.then(() => res.send({token: token}));

						session.sessionToken = token;
					});

				})
				.catch(err => {
					console.log(err, "Does a user with that username exist?");
					res.send(err);
				});
		});
	},

	get: (app) => {
		app.get('/user', (req, res) => {
			User.findOne({username: req.query.username}).then((user) => {
				res.send({username: user.username, email: user.email});
			}).catch((err) => {
				res.send({message: err});
			});
		});

		app.get('/bookings', (req, res) => {
			Booking.find().then((bookings) => {
				bookings.length ? res.send(bookings) : res.send('There are no bookings.');
			}).catch((err) => {
				res.send(err);
			});
		});

		app.get('/bookings/:id', (req, res) => {
			Booking.findById(req.params.id).then(function (booking) {
				booking ? res.send(booking) : res.send('Booking not found!');
			}).catch((err) => {
				res.send(err);
			});
		});
	},

	put: (app) => {
		app.put('/bookings/:id', (req, res) => {
			Booking.findById(req.params.id).then(function (booking) {
				let query = req.body;

				booking.update(query).then((result) => {
					result.ok > 0 ? res.send(`Booking ${req.params.id} updated!`) : res.send(`Booking wasn't updated. Check the request body.`);
				}).catch((err) => {
					res.send(err);
				});
				;
			}).catch((err) => {
				res.send(err);
			});
		});
	},

	delete: (app) => {
		app.delete('/bookings/', (req, res) => {
			Booking.remove().then((bookings) => {
				res.send('All bookings were deleted!');
			}).catch((err) => {
				res.send(err);
			});
		});

		app.delete('/bookings/:id', (req, res) => {
			Booking.remove({_id: req.params.id}).then((bookings) => {
				res.send(`Booking ${req.params.id} was deleted.`);
			}).catch((err) => {
				res.send(err);
			});
		});
	}
};

module.exports = router;