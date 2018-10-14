const mongoose = require('mongoose');
const { Schema } = mongoose;

const characterSchema = new Schema({

});

mongoose.model('Character', characterSchema);

module.exports = characterSchema;
