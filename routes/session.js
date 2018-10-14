module.exports = (app, db) => {
  const User = db.model('User');
  const Game = db.model('Game');

  const findOrCreateUser = async username => {
    let user;
    if (username) {
      user = await User.findOne({ username: username }).exec();
      if (!user) {
        user = new User({ username });
        user = await user.save();
      }
    } else {
      user = null;
    }
    return user;
  }

  app.get('/session', async (req, res) => {
    // user for fetching initial user and game data
    const username = req.session.get("user");
    const user = await findOrCreateUser(username);
    let game = await Game.findOne({ finished: false }).exec();
    res.bang({ user, game });
  });

  app.post('/session', async (req, res) => {
    const { username } = req.parms;
    req.session.set("user", username);
    _username = req.session.get('user');
    const user = await findOrCreateUser(_username);
    res.bang(user);
  });

  app.delete('/session', (req, res) => {
    req.session.set('user', null);
    const user = req.session.get('user');
    res.bang(user);
  });
}
