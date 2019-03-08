import User from '../models/User';
import session from '../session';
import bcrypt from 'bcrypt';

async function postRegistration(req, res) {
	let userData = req.body;

	let existingUser = await User.findOne({username: userData.username});
	if (existingUser && userData.username === existingUser.username) {
		res.status(400).send({error: 'usernameAlreadyTaken'});
		throw 'usernameAlreadyTaken';
	}

	if (userData.password && userData.password !== userData.passwordConfirm) {
		res.status(400).send({error: 'passwordsMustMatch'});
		throw 'passwordsMustMatch';
	}

	userData.password = await bcrypt.hash(userData.password, 10);

	const user = new User(userData);

	try {
		user.save();
	} catch(e) {
		console.log(`Error saving user to the db:`, e)
	}

	res.status(200).send({});
}

module.exports = {postRegistration};
