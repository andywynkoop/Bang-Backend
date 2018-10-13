module.exports = (req, _res, next) => {
  req.parms = Object.assign({}, req.body, req.query);
  next();
}