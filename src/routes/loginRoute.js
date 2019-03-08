import {postLogin} from '../controllers/loginController';

const loginRoute = {

	init(app) {
		app.post('/login', postLogin);
	}

};

export default loginRoute;
