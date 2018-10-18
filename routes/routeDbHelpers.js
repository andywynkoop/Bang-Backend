module.exports = db => {
  const User = db.model('User');
  const Game = db.model('Game');

  // Session Helpers

  const _sessionUser = req => req.session.get("user");

  const _userByUsername = async username => await User.findOne({ username: username }).exec();

  const currentUser = async req => await findOrCreateUser(_sessionUser(req));

  const login = (req, username) => req.session.set("user", username);

  const logout = req => req.session.set('user', null);
  
  const findOrCreateUser = async username => {
    let user;
    if (username) {
      user = await _userByUsername(username);
      if (!user) {
        user = new User({ username });
        user = await user.save();
      }
    } else {
      user = null;
    }
    return user;
  }
  

  // Game Helpers


  const findUnfinishedGame = async () => await Game.findOne({ finished: false }).exec();
  
  const findUnfinishedGameWithPlayers = async () => Game.findOne({ finished: false }).populate('players').exec();

  const getPlayerObjectFromGame = async () => {
    const _game = await findUnfinishedGameWithPlayers();
    let { players } = _game;
    return getPlayerObjectFromPlayerArray(players);
  }

  const getPlayerObjectFromPlayerArray = players => {
    let _players = {};
    players.forEach(player => _players[player._id] = player);
    return _players;
  }

  const _removeUser = (players, user) => players.filter(pid => pid.toString() != user._id.toString());

  const removeUserFromGame = async user => {
    let game = await findUnfinishedGame();
    if (game) {
      game.players = _removeUser(game.players, user);
      game = await game.save();
    }
  }

  // MISC
  const uniq = arr => arr.filter((el, i) => i === arr.indexOf(el));

  return {
    currentUser,
    login,
    logout,
    findUnfinishedGame,
    findUnfinishedGameWithPlayers,
    findOrCreateUser,
    removeUserFromGame,
    getPlayerObjectFromGame,
    getPlayerObjectFromPlayerArray,
    uniq
  }
}
