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

// Get username from userID
router.get('/userid/:userId', async (req, res) => {
  try {
    const user = await newUserModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;