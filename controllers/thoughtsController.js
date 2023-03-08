const Thought = require('../models/Thought');

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single thought by ID
exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new thought
exports.createThought = async (req, res) => {
  const thought = new Thought({
    thoughtText: req.body.thoughtText,
    username: req.body.username,
    userId: req.body.userId,
  });

  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a thought by ID
exports.updateThoughtById = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (updatedThought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a thought by ID
exports.deleteThoughtById = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (deletedThought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a reaction to a thought
exports.addReactionToThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions.push({
      reactionBody: req.body.reactionBody,
      username: req.body.username,
    });

    const updatedThought = await thought.save();
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a reaction from a thought
exports.removeReactionFromThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (thought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    const reaction = thought.reactions.id(req.params.reactionId);
    if (reaction == null) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    reaction.remove();
    const updatedThought = await thought.save();
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};