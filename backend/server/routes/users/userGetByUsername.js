const express = require("express");
const router = express.Router();
const newUserModel = require('../../models/userModel');

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Use findOne to find a user by username
    const user = await newUserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error('Error finding user by username:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
