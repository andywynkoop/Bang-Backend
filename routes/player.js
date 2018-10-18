const aws = require('../aws');



module.exports = (app, db, io) => {
  const User = db.model('User');
  const currentUser = req => req.session.get("user");
  const getCurrentUser = async username => 
    await User.findOne({ username: username }).exec();

  app.patch('/players', async (req, res) => {
    const username = await currentUser(req);
    const user = await getCurrentUser(username);
    let image = req.files.image;
    await aws.put(image);
    user.avatar = `https://s3.amazonaws.com/bang-aa/${image.name}`;
    await user.save();
    res.bang({ player: user });
  });
}