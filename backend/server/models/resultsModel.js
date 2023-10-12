const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    Date: {
        type: Date,
        default: Date.now,
        required: true,
        label: "Date of when assessment was saved",
    },
    //referenced user id
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        label: "User who saved the assessment",
    },
    //referenced segment being assessed
    Segment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true,
        label: "Segment being assessed"
    },
    //array of referenced photo and chosen line
    featurePhotos: [{
        photo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'features.photos',
            required: true,
            label: "Reference to a feature photo",
        },
        lineChoice: {
            type: String,
            required: true,
            label: "The line choice for the photo",
        }
    }],
    //score of assessment
    Score: {
        type: Number,
        required: true,
        label: "result of assessment"
    }
});

const resultsModel = mongoose.model('Result', resultsSchema);

module.exports = resultsModel;
