const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  role: String,
  bullets: Number,
  character: { type: mongoose.Schema.ObjectId, ref: 'Character' },
  cards: [{ type: mongoose.Schema.ObjectId, ref: 'Card' }]
});

mongoose.model('User', userSchema);

module.exports = userSchema;
