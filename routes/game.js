module.exports = (app, db) => {
  const Game = db.model('Game');

  app.post('/game', async (req, res) => {
    let game = new Game();
    game = await game.save();
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