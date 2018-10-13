module.exports = app => {
  app.post('/users', (req, res) => {
    const { username } = req.parms;
    req.session.set("user", username);
    req.session.save(res);
  });
}