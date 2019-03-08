import {postRegistration} from '../controllers/registrationController';

const registrationController = {

	init(app) {
		app.post('/registration', postRegistration);
	}

};

export default registrationController;
