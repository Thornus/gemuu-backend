import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import loginRoute from './routes/loginRoute';
import interestsRoute from './routes/interestsRoute';
import auth from './middlewares/auth';
import cors from 'cors';

db.init('mongodb://localhost:27017/gemuu-local');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(auth);

loginRoute.init(app);
interestsRoute.init(app);

app.listen(3001, () => console.log('Server listening on port 3001!'));
