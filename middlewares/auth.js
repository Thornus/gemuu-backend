import jwt from 'jsonwebtoken';
import session from '../session';

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  console.log(req.body);
  let noSlashPath = req.path.split('/')[1];

  if(noSlashPath.toString() === 'register' || noSlashPath.toString() === 'login') {
    return next();
  }

  if (token) {

    jwt.verify(token, ')>=B`9hK`k=UxJm@', function(err, decoded) {
      console.log(session.sessionToken);
      if(!err && session.sessionToken === token) {
        req.decoded = decoded;
        next();
      } else {
        console.log(err);
        return res.send({message: 'Failed to authenticate token.'});
      }
    });

  } else {

    return res.status(401).send('No token provided.');

  }
};

export default auth;
