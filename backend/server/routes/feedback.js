const express = require('express');
const router = express.Router();
const feedbackModel = require('../models/feedbackModel');
const { newFeedbackValidation } = require('../models/feedbackValidator');

router.post('/create', async (req, res) => {
  const { error } = newFeedbackValidation(req.body);
  if (error) return res.status(400).send({ message: error.errors[0].message });

  const { Star, Name, Email, Message, IssueType } = req.body;

  const createFeedback = new feedbackModel({
    Star: Star,
    Name: Name,
    Email: Email,
    IssueType: IssueType,
    Message: Message,
  });

  try {
    const saveFeedback = await createFeedback.save();
    res.send(saveFeedback);
  } catch (error) {
    res.status(400).send({ message: "Error trying to create Feedback" });
  }
});

router.get('/getAll', async (req, res) => {
  const allFeedback = await feedbackModel.find();
  res.status(200).json(allFeedback);
});

// DELETE route to delete feedback by ID
router.delete('/delete/:resultId', async (req, res) => {
  try {
    const result = await feedbackModel.findByIdAndRemove(req.params.resultId);
    if (result) {
      res.status(204).end(); // Success: 204 No Content
    } else {
      res.status(404).json({ message: 'Result not found' }); // Not Found: 404
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Internal Server Error: 500
  }
});

module.exports = router;