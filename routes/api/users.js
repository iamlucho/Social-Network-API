const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("friends");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single user by ID
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Update a user by ID
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  if (req.body.password != null) {
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete a user by ID
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a friend to a user's friend list
router.post("/:id/friends", getUser, async (req, res) => {
  if (res.user.friends.includes(req.body.friendId)) {
    return res
      .status(400)
      .json({ message: "User is already friends with this user" });
  }

  try {
    res.user.friends.push(req.body.friendId);
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware function to get a single user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
