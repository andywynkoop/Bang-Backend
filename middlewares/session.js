const name = "bangAfterDark"
class Session {
  constructor(req) {
    const cookie = req.biscuits;
    if (cookie) {
      this.cookie = cookie;
    } else {
      this.cookie = {};
    }
  }

  get(key) {
    return this.cookie[key];
  }

  set(key, val) {
    return this.cookie[key] = val;
  }
}

module.exports = (req, res, next) => {
  req.session = new Session(req, res);
  res.session = req.session;
  next();
}