module.exports = app => {
  app.get('/session', (req, res) => {
    const username = req.session.get("user");
    const user = username ? username : null;
    res.bang(user);
  });

  app.post('/session', async (req, res) => {
    const { username } = req.parms;
    req.session.set("user", username);
    const user = req.session.get('user');
    res.bang(user);
  });

  app.delete('/session', (req, res) => {
    req.session.set('user', null);
    const user = req.session.get('user');
    res.bang(user);
  });
}
