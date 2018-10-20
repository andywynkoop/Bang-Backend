const aws = require('../aws');



module.exports = (app, db, io) => {
  const User = db.model('User');
  const { currentUser } = require('./routeDbHelpers');

  // update a player's avatar
  app.patch('/players', async (req, res) => {
    const user = await currentUser(req);
    let image = req.files.image;
    await aws.put(image);
    user.avatar = `https://s3.amazonaws.com/bang-aa/${image.name}`;
    await user.save();
    res.bang({ player: user });
  });
}