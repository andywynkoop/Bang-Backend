module.exports = (app, db) => {
  require('./session')(app);
  require('./user')(app);
  require('./game')(app, db);

  app.get('/', (_req, res) => {
    res.send("We're going to the GENNNNNNERAL STORE!!!!!!!!!!")
  });
}