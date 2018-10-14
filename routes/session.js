module.exports = (app, db, io) => {
  const User = db.model('User');
  const Game = db.model('Game');

  // helpers
  
  const currentUser = req => req.session.get("user");

  const login = (req, username) => req.session.set("user", username);

  const logout = req => req.session.set('user', null);

  const userByUsername = async username =>
    await User.findOne({ username: username }).exec();

  const findOrCreateUser = async username => {
    let user;
    if (username) {
      user = await userByUsername(username);
      if (!user) {
        user = new User({ username });
        user = await user.save();
      }
    } else {
      user = null;
    }
    return user;
  }

  const getGame = async () => await Game.findOne({ finished: false }).exec();

  const playersFromGame = async () => {
    const _game = await Game.findOne({ finished: false }).populate('players').exec();
    let { players } = _game;
    let _players = {};
    players.forEach(player => _players[player._id] = player);
    players = _players;
  }

  const removeUser = (players, user) => players.filter(pid => pid.toString() != user._id.toString());

  const removeUserFromGame = async user => {
    let game = await getGame();
    if (game) {
      game.players = removeUser(game.players, user);
      game = await game.save();
    }
  }

  // Routes

  app.get('/session', async (req, res) => {
    // user for fetching initial user and game data
    const username = currentUser(req);
    const user = await findOrCreateUser(username);
    let game = await getGame();
    let players = await playersFromGame();
    res.bang({ user, game, players });
  });

  app.post('/session', async (req, res) => {
    const { username } = req.parms;
    login(req, username);
    const _username = currentUser(req);
    const user = await findOrCreateUser(_username);
    let game = await getGame();
    res.bang({ user, game });
  });

  app.delete('/session', async (req, res) => {
    let oldUser = currentUser(req);
    logout(req);
    let user = await userByUsername(oldUser);
    await removeUserFromGame(user);
    user.game = null;
    user = await user.save();
    io.sockets.emit('playerLeft', user._id)
    res.bang(null);
  });
}
