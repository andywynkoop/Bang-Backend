module.exports = (app, db, io) => {
  const { currentUser,
    login,
    logout,
    findUnfinishedGame,
    removeUserFromGame,
    getPlayerObjectFromGame  } = require('./routeDbHelpers')(db);

  // Routes

  app.get('/session', async (req, res) => {
    // user for fetching initial user and game data
    const user = await currentUser(req);
    let game = await findUnfinishedGame();
    let players = {};
    if (game) {
      players = await getPlayerObjectFromGame();
    }
    let session = null;
    if (user) {
      session = user._id;
      players[session] = user;
    }
    res.bang({ session, game, players });
  });

  app.post('/session', async (req, res) => {
    const { username } = req.parms;
    login(req, username);
    const user = await currentUser(req);
    let game = await findUnfinishedGame();
    res.bang({ player: user, game });
  });

  app.delete('/session', async (req, res) => {
    let user = await currentUser(req);
    logout(req);
    await removeUserFromGame(user);
    user.game = null;
    user = await user.save();
    io.sockets.emit('playerLeft', user._id)
    res.bang(null);
  });
}
