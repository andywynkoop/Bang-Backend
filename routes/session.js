module.exports = app => {
  app.get('/session', (req, res) => {
    const username = req.session.get("user");
    const user = username ? username : "No User Found!";
    res.bang(user);
  });

  app.post('/session', async (req, res) => {
    const { username } = req.parms;
    req.session.set("user", username);
    res.bang(`logged in as ${username}`);
  });

  app.delete('/session', (req, res) => {
    const username = req.session.get('user');
    req.session.set('user', null);
    res.bang(`${username} logged out`);
  });
}
