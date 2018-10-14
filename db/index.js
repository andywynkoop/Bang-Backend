const mongoose = require('mongoose');
const LOCAL_URI = 'mongodb://localhost:27017/schwift';
const { MLAB_URI } = require('./db.config');

MONGO_URI = process.env.MONGO_URI || MLAB_URI || LOCAL_URI;

const connect = () =>
  mongoose.connect(MONGO_URI, { useNewUrlParser: true });

module.exports = connect;