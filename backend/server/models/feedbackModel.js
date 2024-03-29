// feedbackModel.js

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    Star: {
        type: Number,
        minimum: 1,
        maximum: 5,
        required:true,
        label: "number of starts given for feedback"
    },
    Name: {
        type: String,
        required: true,
        label: "Full name of user giving feedback"
    },
    Email: {
        type: String,
        required: true,
        label: "Email of user giving feedback"
    },
    IssueType: {
        type: String,
        label: "Issue type provided by the user",
      },
      Message: {
        type: String,
        max: 250,
        required: true,
        label: "feedback message from the user"
    },
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

module.exports = feedbackModel; 