const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new thought
router.post('/', async (req, res) => {
  const thought = new Thought({
    text: req.body.text,
    userId: req.body.userId,
  });

  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single thought by ID
router.get('/:id', getThought, (req, res) => {
  res.json(res.thought);
});

// Update a thought by ID
router.patch('/:id', getThought, async (req, res) => {
  if (req.body.text != null) {
    res.thought.text = req.body.text;
  }

  try {
    const updatedThought = await res.thought.save();
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a thought by ID
router.delete('/:id', getThought, async (req, res) => {
  try {
    await res.thought.remove();
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a single thought by ID
async function getThought(req, res, next) {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought == null) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.thought = thought;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;