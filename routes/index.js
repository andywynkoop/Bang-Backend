module.exports = (app, db, io) => {
  require('./session')(app, db, io);
  require('./game')(app, db, io);
  require('./player')(app, db, io);

  app.get('/', (_req, res) => {
    res.send("We're going to the GENNNNNNERAL STORE!!!!!!!!!!")
  });
}