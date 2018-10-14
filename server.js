const app = require('express')();
require('./middlewares')(app);
require('./models');
require('./db')().then(db => {
  require('./routes')(app, db);
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
})


// Note: it's possible to send stuff to slack via webhooks
// we could broadcast game updates to the bang channel