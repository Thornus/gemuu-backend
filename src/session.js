let _sessionToken = {};

class Session {

  static get sessionToken() { return _sessionToken; }
  static set sessionToken(value) { _sessionToken = value; }

}

module.exports = Session;