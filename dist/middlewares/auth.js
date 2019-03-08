'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _session = require('../session');

var _session2 = _interopRequireDefault(_session);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

  var noAuthRoutes = ['/login', '/register', '/interests', '/registration'];

  if (_lodash2.default.includes(noAuthRoutes, req.path)) {
    console.log('Passing through \'' + req.path + '\', which doesn\'t need auth');
    return next();
  }

  if (token) {
    console.log('Passing through \'' + req.path + '\' with token:', token);

    _jsonwebtoken2.default.verify(token, ')>=B`9hK`k=UxJm@', function (err, decoded) {
      console.log('session token:', _session2.default.sessionToken);
      if (!err && _session2.default.sessionToken === token) {
        req.decoded = decoded;
        next();
      } else {
        console.log('Auth error:', err);
        return res.send({ message: 'Failed to authenticate token.' });
      }
    });
  } else {

    return res.status(401).send('No token provided.');
  }
};

exports.default = auth;