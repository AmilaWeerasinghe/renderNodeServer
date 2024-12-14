const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new Schema({
  name: String,
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Skill', skillSchema);