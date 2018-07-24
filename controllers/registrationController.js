import User from '../models/User';
import session from '../session';
import bcrypt from 'bcrypt';

async function postRegistration(req, res) {
	let userData = req.body;

	if (userData.password && userData.password !== userData.passwordConfirm) {
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
