module.exports = app => {
  require('./session')(app);
  require('./user')(app)

  app.get('/', (_req, res) => {
    res.send("We're going to the GENNNNNNERAL STORE!!!!!!!!!!")
  });
}