import {getInterests} from '../controllers/interestsController';

const interestsRoute = {

	init(app) {
		app.get('/interests', getInterests);
	}

};

export default interestsRoute;
