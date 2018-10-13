module.exports = (req, res, next) => {
  let { data } = req.query;
  if (!data) next();
  if (data) data = JSON.parse(data);
  const biscuits = data.biscuits ? data.biscuits : {};
  Object.assign(req.parms, data);
  req.biscuits = biscuits;
  res.bang = (body) => {
    const _body = Object.assign({ body }, { biscuits: req.session.cookie });
    res.send(_body);
  }
  next();
}