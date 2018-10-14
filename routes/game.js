module.exports = (app, db, io) => {
  const Game = db.model('Game');

  app.post('/game', async (req, res) => {
    let game = new Game();
    game = await game.save();
    io.sockets.emit("newGame", game);
    res.bang(game);
  });

  app.get('/game', async (req, res) => {
    let game = await Game.findOne({ finished: false }).exec();
    if (game) {
      const { _id, started, finished } = game;
      res.bang({ _id, started, finished });
    } else {
      res.send(null);
    }
  });
}