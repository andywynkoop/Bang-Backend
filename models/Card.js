const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
  
});

mongoose.model('Card', cardSchema);

module.exports = cardSchema;
