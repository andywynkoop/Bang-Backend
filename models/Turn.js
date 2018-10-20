const mongoose = require('mongoose');
const { Schema } = mongoose;

const turnSchema = new Schema({
  game: { type: Schema.ObjectId, ref: 'Game'},
  player: { type: Schema.ObjectId, ref: 'User' },
  playerIdx: Number
});

mongoose.model('Turn', turnSchema);

module.exports = turnSchema;
