const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    Date: {
        type: Date,
        default: Date.now,
        required: true,
        label: "Date of when assessment was saved",
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        label: "User who saved the assessment",
    },
    Segment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true,
        label: "Segment being assessed"
    },
    lineChoice: [{
        type: String,
        required: true,
        label: "The line choice for the users",
    }],
    Score: {
        type: Number,
        required: true,
        label: "result of assessment"
    }
});

const resultsModel = mongoose.model('Result', resultsSchema);

module.exports = resultsModel;
