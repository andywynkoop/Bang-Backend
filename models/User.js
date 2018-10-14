const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  role: String,
  bullets: { type: Number, default: 3 },
  game: { type: Schema.ObjectId, ref: 'Game' }
});

mongoose.model('User', userSchema);

module.exports = userSchema;
