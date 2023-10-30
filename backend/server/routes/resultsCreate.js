const express = require('express');
const router = express.Router();
const Result = require('../models/resultsModel');
const User = require('../models/userModel');

// Create a new assessment result
router.post('/results', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all assessment results
router.get('/results', async (req, res) => {
  const results = await Result.find();
  res.status(200).json(results);
});

// Get a specific assessment result by ID
router.get('/results/:resultId', async (req, res) => {
  const result = await Result.findById(req.params.resultId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: 'Result not found' });
  }
});

// Update an assessment result by ID
router.put('/results/:resultId', async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.resultId, req.body, { new: true });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an assessment result by ID
router.delete('/results/:resultId', async (req, res) => {
  const result = await Result.findByIdAndRemove(req.params.resultId);
  if (result) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Result not found' });
  }
});
//get all results by username
// get all results by username
router.get('/results/user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // First, find the user with the provided username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now, use the user's _id to query the assessments
    const results = await Result.find({ User: user._id });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
