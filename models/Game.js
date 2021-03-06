const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
  started: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  players: [{ type: Schema.ObjectId, ref: 'User' }],
  turn: { type: Schema.ObjectId, ref: 'Turn' },
  deck: { type: Array, default: [] }
});

mongoose.model('Game', gameSchema);

module.exports = gameSchema;
