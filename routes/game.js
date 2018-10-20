const BangGame = require('../game/BangGame');
module.exports = (app, db, io) => {
  const Game = db.model('Game');
  const User = db.model('User');
  const Turn = db.model('Turn');

  const { currentUser, findUnfinishedGame, getPlayerObjectFromGame, getPlayerObjectFromPlayerArray, uniq } = require('./routeDbHelpers')(db);

  app.patch('/game/join', async (req, res) => {
    let game = await findUnfinishedGame();
    let user = await User.findOne({ _id: req.parms._id }).exec();
    game.players.push(user);
    game.players = uniq(game.players);
    user.game = game._id;
    game = await game.save();
    user = await user.save();
    players = await getPlayerObjectFromGame();
    io.sockets.emit("newPlayer", game);
    io.sockets.emit("currentPlayers", players);
    res.bang({ player:user, game });
  });

  app.patch('/game/start', async (req, res) => {
    let game = await Game.findOne({ _id: req.parms._id }).populate('players').exec();
    game.started = true;
    let bangGame = new BangGame(game);
    bangGame.start();
    let { players, turn } = await bangGame.persistPlayerData();
    turn = new Turn({ game: turn.game._id, player: turn.player, playerIdx: turn.playerIdx });
    turn = await turn.save();
    players = getPlayerObjectFromPlayerArray(players);
    game.turn = turn._id;
    game = await game.save();
    res.bang({ game, turn, players });
  });

  app.post('/game', async (req, res) => {
    let user = await currentUser(req);
    let game = new Game();
    game.players.push(user._id);
    game = await game.save();
    user.game = game._id;
    console.log(user, game)
    user = await user.save();
    io.sockets.emit("newGame", game);
    res.bang({ game, player: user });
  });

  app.get('/game', async (req, res) => {
    let game = await findUnfinishedGame();
    if (game) {
      const { _id, started, finished } = game;
      res.bang({ _id, started, finished });
    } else {
      res.send(null);
    }
  });
}