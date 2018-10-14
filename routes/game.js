module.exports = (app, db, io) => {
  const Game = db.model('Game');
  const User = db.model('User');

  const getGame = async () => await Game.findOne({ finished: false }).exec();
  const playersFromGame = async () => {
    const _game = await Game.findOne({ finished: false }).populate('players').exec();
    let { players } = _game;
    let _players = {};
    players.forEach(player => _players[player._id] = player);
    return _players;
  }
  const uniq = arr => arr.filter((el, i) => i === arr.indexOf(el));

  app.patch('/game', async (req, res) => {
    let game = await getGame();
    let user = await User.findOne({ _id: req.parms._id }).exec();
    game.players.push(user);
    game.players = uniq(game.players);
    user.game = game._id;
    game = await game.save();
    user = await user.save();
    players = await playersFromGame();
    io.sockets.emit("newPlayer", game);
    io.sockets.emit("currentPlayers", players);
    res.bang({ user, game });
  });

  app.post('/game', async (req, res) => {
    let game = new Game();
    game = await game.save();
    io.sockets.emit("newGame", game);
    res.bang(game);
  });

  app.get('/game', async (req, res) => {
    let game = await getGame();
    if (game) {
      const { _id, started, finished } = game;
      res.bang({ _id, started, finished });
    } else {
      res.send(null);
    }
  });
}