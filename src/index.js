import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import loginRoute from './routes/loginRoute';
import interestsRoute from './routes/interestsRoute';
import registrationRoute from './routes/registrationRoute';
import auth from './middlewares/auth';
import cors from 'cors';

const localDB = 'mongodb://localhost:27017/gemuu-local';
const herokuDB = 'mongodb://user0:user0pw@ds015730.mlab.com:15730/heroku_cc2214zg';

db.init(herokuDB); 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(auth);

loginRoute.init(app);
interestsRoute.init(app);
registrationRoute.init(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
