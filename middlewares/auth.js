import jwt from 'jsonwebtoken';
import session from '../session';
import _ from 'lodash';

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  console.log('Passing through auth with token:', token);
  const noAuthPaths = ['/login', '/register', '/interests']

  if(_.includes(noAuthPaths, req.path)) {
    return next();
  }

  if (token) {

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
