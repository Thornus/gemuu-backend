import User from '../models/User';
import session from '../session';
import bcrypt from 'bcrypt';

export async function login(req, res) {
	let userData = req.body;

	if (!userData.username || !userData.password) {
		return res.status(400).send('Invalid request data.');
	}

	let user = await User.findOne({username: userData.username});

	if(user) {
		bcrypt.compare(userData.password, user.password, async function (err, result) {
			if (!result) {
				return res.status(401).send({message: 'Wrong username or password.'});
			}

			let token = jwt.sign(user.password, ')>=B`9hK`k=UxJm@');
			user.token = token;

			await user.save();
			res.send({token: token});

			session.sessionToken = token;
		});
	} else {
		return res.status(401).send({message: 'Wrong username or password.'});
	}

}
