import jwt from 'jsonwebtoken';
import session from '../session';
import _ from 'lodash';

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  const noAuthRoutes = ['/login', '/register', '/interests', '/registration']

  if(_.includes(noAuthRoutes, req.path)) {
	console.log(`Passing through '${req.path}', which doesn't need auth`);
    return next();
  }

  if (token) {
	console.log(`Passing through '${req.path}' with token:`, token);

    jwt.verify(token, ')>=B`9hK`k=UxJm@', function(err, decoded) {
      console.log('session token:', session.sessionToken);
      if(!err && session.sessionToken === token) {
        req.decoded = decoded;
        next();
      } else {
        console.log('Auth error:', err);
        return res.send({message: 'Failed to authenticate token.'});
      }
    });

  } else {

    return res.status(401).send('No token provided.');

  }
};

export default auth;
