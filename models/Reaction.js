const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['like', 'love', 'dislike'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  thought: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
    required: true,
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;