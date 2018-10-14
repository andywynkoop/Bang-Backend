const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./middlewares')(app);
require('./models');
require('./db')().then(db => {
  require('./routes')(app, db, io);
  
  const port = process.env.PORT || 3001;
  
  server.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
})


// Note: it's possible to send stuff to slack via webhooks
// we could broadcast game updates to the bang channel