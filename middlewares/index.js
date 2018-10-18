const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const paramajama = require('./parms');
const session = require('./session');
const cors = require('./cors');
const biscuits = require('./biscuits');
const fileUpload = require('express-fileupload');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(paramajama);
  app.use(biscuits);
  app.use(session);
  app.use(cors);
  app.use(fileUpload());
}