import {login} from '../controllers/loginController';

const loginRoute = {

	init(app) {
		app.post('/login', login);
	}

};

export default loginRoute;
