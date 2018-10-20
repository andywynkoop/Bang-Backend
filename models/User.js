const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  role: String,
  character: Object,
  bullets: { type: Number, default: 3 },
  game: { type: Schema.ObjectId, ref: 'Game' },
  avatar: String,
  cards: { type: Array, default: [] }
});

mongoose.model('User', userSchema);

module.exports = userSchema;
