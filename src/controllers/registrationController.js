import User from '../models/User';
import session from '../session';
import bcrypt from 'bcrypt';

async function postRegistration(req, res) {
	let userData = req.body;
	let {username, password, passwordConfirm} = req.body;

	if(!username || !password || !passwordConfirm) {
		res.status(400).send({error: 'badRequest'});
		throw 'badRequest';
	}

	let existingUser = await User.findOne({username});
	if (existingUser && username === existingUser.username) {
		res.status(400).send({error: 'usernameAlreadyTaken'});
		throw 'usernameAlreadyTaken';
	}

	if (password !== passwordConfirm) {
		res.status(400).send({error: 'passwordsMustMatch'});
		throw 'passwordsMustMatch';
	}

	password = await bcrypt.hash(password, 10);

	const user = new User({...userData, username, password});

	try {
		user.save();
	} catch(e) {
		console.log(`Error saving user to the db:`, e)
	}

	res.status(200).send({});
}

module.exports = {postRegistration};
