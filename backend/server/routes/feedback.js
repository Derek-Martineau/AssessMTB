const express = require('express');
const router = express.Router();
const z = require('zod')
const feedbackModel = require('../models/feedbackModel');
const { newFeedbackValidation } = require('../models/feedbackValidator');

//Create feeback
router.post('/create', async (req, res) => {
        const { error } = newFeedbackValidation(req.body);  // Fix here
        console.log(error);
        if (error) return res.status(400).send({ message: error.errors[0].message });
    
        const { Name, Email, Message } = req.body;
    
        // creates new user
        const createFeedback = new feedbackModel({
            Name: Name,
            Email: Email,
            Message: Message,
        });
    
        try {
            const saveFeedback = await createFeedback.save();
            res.send(saveFeedback);
        } catch (error) {
            res.status(400).send({ message: "Error trying to create Feedback" });
        }
    });

//Get all Feedback
router.get('/getAll', async (req, res) => {
        const allFeedback = await feedbackModel.find();
        res.status(200).json(allFeedback);   
});

module.exports = router;