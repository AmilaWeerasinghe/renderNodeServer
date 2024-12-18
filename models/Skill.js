const mongoose = require('mongoose');
const { Schema } = mongoose;

const skillSchema = new Schema({
  name: String,
  votes: { type: Number, default: 0 },
  votedUsers: [{ type: String }] // Array of user ids who voted for this skill
});

module.exports = mongoose.model('Skill', skillSchema, 'skills');