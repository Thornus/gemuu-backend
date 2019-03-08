'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _loginRoute = require('./routes/loginRoute');

var _loginRoute2 = _interopRequireDefault(_loginRoute);

var _interestsRoute = require('./routes/interestsRoute');

var _interestsRoute2 = _interopRequireDefault(_interestsRoute);

var _registrationRoute = require('./routes/registrationRoute');

var _registrationRoute2 = _interopRequireDefault(_registrationRoute);

var _auth = require('./middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localDB = 'mongodb://localhost:27017/gemuu-local';
var herokuDB = 'mongodb://user0:user0pw@ds015730.mlab.com:15730/heroku_cc2214zg';

_db2.default.init(herokuDB);

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());
app.use(_auth2.default);

_loginRoute2.default.init(app);
_interestsRoute2.default.init(app);
_registrationRoute2.default.init(app);

app.listen(3001, function () {
  return console.log('Server listening on port 3001!');
});